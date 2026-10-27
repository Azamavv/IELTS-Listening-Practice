import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Server-side Gemini client per skill guidelines
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// API endpoint for evaluating IELTS Writing (Task 1 or Task 2)
app.post('/api/evaluate-writing', async (req: Request, res: Response) => {
  try {
    const { taskType, prompt, studentResponse, chartContext } = req.body;

    if (!studentResponse || studentResponse.trim().length < 10) {
      return res.status(400).json({ error: 'Response is too short to evaluate.' });
    }

    const systemInstruction = `You are a certified, senior IELTS examiner with over 15 years of experience marking IELTS Academic and General Training Writing tasks.
Evaluate the candidate's essay strictly according to the official IELTS 9-band Writing Assessment Criteria:
1. Task Achievement (for Task 1) or Task Response (for Task 2)
2. Coherence and Cohesion
3. Lexical Resource
4. Grammatical Range and Accuracy

Calculate the overall band score as the mathematical average of the 4 criteria rounded to the nearest half-band (e.g., 6.25 -> 6.5, 6.75 -> 7.0, 6.125 -> 6.0).
Provide realistic, constructive, actionable feedback, highlight 3-4 specific vocabulary improvements, point out grammatical corrections, and include a brief high-band (Band 8.5-9) model excerpt demonstrating how the candidate could elevate their response.`;

    const contents = `Task Type: ${taskType === 'task1' ? 'IELTS Writing Task 1 (Report/Letter, minimum 150 words recommended)' : 'IELTS Writing Task 2 (Discursive Essay, minimum 250 words recommended)'}
Prompt: ${prompt}
${chartContext ? `Chart / Data Description: ${chartContext}\n` : ''}
Candidate's Submission:
"""
${studentResponse}
"""

Please provide a detailed examiner assessment in the specified JSON schema.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            overallBand: { type: Type.NUMBER, description: 'Overall band score from 1.0 to 9.0 in half band increments' },
            scores: {
              type: Type.OBJECT,
              properties: {
                taskAchievement: { type: Type.NUMBER, description: 'Score 1-9 for Task Achievement / Response' },
                coherenceCohesion: { type: Type.NUMBER, description: 'Score 1-9 for Coherence & Cohesion' },
                lexicalResource: { type: Type.NUMBER, description: 'Score 1-9 for Lexical Resource' },
                grammaticalRange: { type: Type.NUMBER, description: 'Score 1-9 for Grammatical Range & Accuracy' },
              },
              required: ['taskAchievement', 'coherenceCohesion', 'lexicalResource', 'grammaticalRange'],
            },
            wordCount: { type: Type.INTEGER, description: 'Total word count of candidate response' },
            penalties: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Any word count under-length penalties or format notes',
            },
            examinerFeedback: { type: Type.STRING, description: 'Comprehensive examiner commentary summarizing performance' },
            strengths: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: '2-3 key strengths observed in the essay',
            },
            improvements: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: '2-3 specific high-impact areas for improvement',
            },
            vocabularySuggestions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  original: { type: Type.STRING },
                  suggestion: { type: Type.STRING },
                  context: { type: Type.STRING },
                },
                required: ['original', 'suggestion', 'context'],
              },
            },
            grammarCorrections: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  error: { type: Type.STRING },
                  correction: { type: Type.STRING },
                  explanation: { type: Type.STRING },
                },
                required: ['error', 'correction', 'explanation'],
              },
            },
            modelExcerpt: { type: Type.STRING, description: 'A polished high-band model paragraph example' },
          },
          required: ['overallBand', 'scores', 'wordCount', 'examinerFeedback', 'strengths', 'improvements', 'vocabularySuggestions', 'grammarCorrections', 'modelExcerpt'],
        },
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json(parsed);
  } catch (error: any) {
    console.error('Error evaluating writing:', error);
    return res.status(500).json({
      error: 'Evaluation service encountered an error. Please try again.',
      details: error.message,
    });
  }
});

// API endpoint for evaluating IELTS Speaking
app.post('/api/evaluate-speaking', async (req: Request, res: Response) => {
  try {
    const { part, questionPrompt, transcriptOrNotes, targetBand } = req.body;

    if (!transcriptOrNotes || transcriptOrNotes.trim().length < 5) {
      return res.status(400).json({ error: 'Speaking content is too brief.' });
    }

    const systemInstruction = `You are a certified IELTS Speaking examiner.
Evaluate the candidate's spoken response transcript for IELTS Speaking Part ${part} against official criteria:
1. Fluency and Coherence
2. Lexical Resource
3. Grammatical Range and Accuracy
4. Pronunciation & Intonation (inferred from speech patterns, connectors, and discourse markers)

Provide an accurate band score, actionable breakdown, strengths, areas to level up to Band 8+, and an upgraded natural native speaker phrasing.`;

    const contents = `Speaking Test Part: Part ${part}
Examiner Question / Cue Card Prompt: ${questionPrompt}
Candidate Speech / Transcript:
"""
${transcriptOrNotes}
"""

Target Band: ${targetBand || '7.5'}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            overallBand: { type: Type.NUMBER, description: 'Overall estimated band score 1.0 to 9.0' },
            scores: {
              type: Type.OBJECT,
              properties: {
                fluencyCoherence: { type: Type.NUMBER },
                lexicalResource: { type: Type.NUMBER },
                grammaticalRange: { type: Type.NUMBER },
                pronunciation: { type: Type.NUMBER },
              },
              required: ['fluencyCoherence', 'lexicalResource', 'grammaticalRange', 'pronunciation'],
            },
            examinerNotes: { type: Type.STRING },
            strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
            improvements: { type: Type.ARRAY, items: { type: Type.STRING } },
            upgradedSample: { type: Type.STRING, description: 'A natural, idiomatic Band 8.5/9 spoken response' },
            idiomaticExpressions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  phrase: { type: Type.STRING },
                  meaning: { type: Type.STRING },
                },
                required: ['phrase', 'meaning'],
              },
            },
          },
          required: ['overallBand', 'scores', 'examinerNotes', 'strengths', 'improvements', 'upgradedSample', 'idiomaticExpressions'],
        },
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json(parsed);
  } catch (error: any) {
    console.error('Error evaluating speaking:', error);
    return res.status(500).json({
      error: 'Speaking evaluation encountered an error.',
      details: error.message,
    });
  }
});

// Setup Vite middlewares for development or static serving for production
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`IELTSprep server running on http://localhost:${PORT}`);
  });
}

startServer();
