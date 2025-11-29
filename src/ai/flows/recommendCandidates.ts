import type { Job, User } from '@/lib/types';
import { mockUsers } from '@/lib/mock-data';

/**
 * Simulates an AI-powered recommendation engine for job candidates.
 *
 * In a real application, this function would be a Genkit flow that performs
 * complex reasoning over a database of user profiles, matching them against
 * job requirements, historical performance, and other signals.
 *
 * @param job The job posting to find candidates for.
 * @returns A promise that resolves to an array of recommended User objects.
 */
export const recommendCandidates = async (job: Job): Promise<User[]> => {
  // Simulate network delay and AI processing time
  await new Promise(resolve => setTimeout(resolve, 1500));

  const candidates: User[] = mockUsers;

  // Simulate AI matching logic: find candidates who have at least one required skill.
  const jobSkills = new Set(job.skills);
  const recommended = candidates.filter(candidate =>
    candidate.skills.some(skill => jobSkills.has(skill)) && candidate.role === 'seeker'
  );

  // Simulate ranking: In a real scenario, this would involve a scoring model.
  // Here, we just return the first few matches.
  return recommended.slice(0, 5);
};
