'use server';

/**
 * @fileOverview Implements AI-powered candidate recommendations for monthly subscribers.
 *
 * - recommendCandidates - A function that returns AI-recommended candidates based on job description, skills, and performance.
 * - RecommendCandidatesInput - The input type for the recommendCandidates function.
 * - RecommendCandidatesOutput - The return type for the recommendCandidates function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendCandidatesInputSchema = z.object({
  jobDescription: z.string().describe('Detailed description of the job.'),
  requiredSkills: z.array(z.string()).describe('List of required skills for the job.'),
  candidatePerformanceData: z.array(z.object({
    candidateId: z.string().describe('Unique identifier for the candidate.'),
    skills: z.array(z.string()).describe('List of skills possessed by the candidate.'),
    performanceScore: z.number().describe('A numerical score representing the candidate\'s past performance.'),
    experience: z.string().describe('Description of the candidate experience'),
  })).describe('An array of candidate objects with their skills and performance data.'),
});
export type RecommendCandidatesInput = z.infer<typeof RecommendCandidatesInputSchema>;

const RecommendCandidatesOutputSchema = z.array(z.object({
  candidateId: z.string().describe('Unique identifier of the recommended candidate.'),
  reason: z.string().describe('Explanation of why the candidate is recommended.'),
  matchScore: z.number().describe('A numerical score indicating how well the candidate matches the job requirements.'),
}));
export type RecommendCandidatesOutput = z.infer<typeof RecommendCandidatesOutputSchema>;

export async function recommendCandidates(input: RecommendCandidatesInput): Promise<RecommendCandidatesOutput> {
  return recommendCandidatesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendCandidatesPrompt',
  input: {schema: RecommendCandidatesInputSchema},
  output: {schema: RecommendCandidatesOutputSchema},
  prompt: `You are an AI assistant designed to recommend the best job candidates based on a job description, required skills, and candidate performance data.

Job Description: {{{jobDescription}}}
Required Skills: {{#each requiredSkills}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}

Candidate Performance Data:
{{#each candidatePerformanceData}}
  Candidate ID: {{{candidateId}}}
  Skills: {{#each skills}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
  Performance Score: {{{performanceScore}}}
  Experience: {{{experience}}}
{{/each}}

Based on this information, recommend the candidates that are the best fit for the job. Explain your reasoning for each recommendation and provide a match score from 0 to 1, where 1 is a perfect match. Return an array of candidates sorted by Match Score in descending order.
`,
});

const recommendCandidatesFlow = ai.defineFlow(
  {
    name: 'recommendCandidatesFlow',
    inputSchema: RecommendCandidatesInputSchema,
    outputSchema: RecommendCandidatesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
