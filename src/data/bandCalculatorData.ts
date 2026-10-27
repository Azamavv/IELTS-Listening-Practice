/**
 * Official IELTS Raw Score to Band Score Conversion Tables
 * Listening and Reading have 40 questions each.
 */

export function calculateListeningBand(rawScore: number): number {
  if (rawScore >= 39) return 9.0;
  if (rawScore >= 37) return 8.5;
  if (rawScore >= 35) return 8.0;
  if (rawScore >= 32) return 7.5;
  if (rawScore >= 30) return 7.0;
  if (rawScore >= 26) return 6.5;
  if (rawScore >= 23) return 6.0;
  if (rawScore >= 18) return 5.5;
  if (rawScore >= 16) return 5.0;
  if (rawScore >= 13) return 4.5;
  if (rawScore >= 10) return 4.0;
  if (rawScore >= 7) return 3.5;
  if (rawScore >= 5) return 3.0;
  if (rawScore >= 3) return 2.5;
  if (rawScore >= 1) return 2.0;
  return 1.0;
}

export function calculateReadingAcademicBand(rawScore: number): number {
  if (rawScore >= 39) return 9.0;
  if (rawScore >= 37) return 8.5;
  if (rawScore >= 35) return 8.0;
  if (rawScore >= 33) return 7.5;
  if (rawScore >= 30) return 7.0;
  if (rawScore >= 27) return 6.5;
  if (rawScore >= 23) return 6.0;
  if (rawScore >= 19) return 5.5;
  if (rawScore >= 15) return 5.0;
  if (rawScore >= 13) return 4.5;
  if (rawScore >= 10) return 4.0;
  if (rawScore >= 8) return 3.5;
  if (rawScore >= 6) return 3.0;
  if (rawScore >= 4) return 2.5;
  if (rawScore >= 2) return 2.0;
  return 1.0;
}

export function calculateReadingGeneralBand(rawScore: number): number {
  if (rawScore >= 40) return 9.0;
  if (rawScore >= 39) return 8.5;
  if (rawScore >= 37) return 8.0;
  if (rawScore >= 36) return 7.5;
  if (rawScore >= 34) return 7.0;
  if (rawScore >= 32) return 6.5;
  if (rawScore >= 30) return 6.0;
  if (rawScore >= 27) return 5.5;
  if (rawScore >= 23) return 5.0;
  if (rawScore >= 19) return 4.5;
  if (rawScore >= 15) return 4.0;
  if (rawScore >= 12) return 3.5;
  if (rawScore >= 9) return 3.0;
  if (rawScore >= 6) return 2.5;
  if (rawScore >= 3) return 2.0;
  return 1.0;
}

export function calculateOverallBand(
  listening: number,
  reading: number,
  writing: number,
  speaking: number
): number {
  const avg = (listening + reading + writing + speaking) / 4;
  const decimal = avg - Math.floor(avg);

  if (decimal < 0.25) {
    return Math.floor(avg);
  } else if (decimal < 0.75) {
    return Math.floor(avg) + 0.5;
  } else {
    return Math.ceil(avg);
  }
}

export const CEFR_MAPPING: Record<number, { level: string; descriptor: string }> = {
  9.0: { level: 'C2', descriptor: 'Expert User - Fully operational command with complete fluency, accuracy, and understanding.' },
  8.5: { level: 'C2', descriptor: 'Very Good User - Operational command with occasional non-systematic inaccuracies.' },
  8.0: { level: 'C1+', descriptor: 'Very Good User - Fully operational command with sophisticated argument handling.' },
  7.5: { level: 'C1', descriptor: 'Good User - Effective operational proficiency with flexible language use in complex academic contexts.' },
  7.0: { level: 'C1', descriptor: 'Good User - Handles complex language well and understands detailed reasoning.' },
  6.5: { level: 'B2+', descriptor: 'Competent User - Effective command despite occasional inaccuracies and misunderstandings.' },
  6.0: { level: 'B2', descriptor: 'Competent User - Can use and understand fairly complex language in familiar situations.' },
  5.5: { level: 'B2-', descriptor: 'Modest User - Partial command, copes with overall meaning in most situations.' },
  5.0: { level: 'B1+', descriptor: 'Modest User - Partial command, likely to make many errors but handles basic communication.' },
  4.5: { level: 'B1', descriptor: 'Limited User - Basic competence is limited to familiar situations.' },
  4.0: { level: 'B1-', descriptor: 'Limited User - Frequent problems in understanding and expression.' },
};
