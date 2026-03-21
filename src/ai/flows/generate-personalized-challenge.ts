'use server';

/**
 * @fileOverview Generates personalized erotic challenges based on couple's preferences.
 *
 * - generatePersonalizedChallenge - A function that generates a personalized erotic challenge.
 * - GeneratePersonalizedChallengeInput - The input type for the generatePersonalizedChallenge function.
 * - GeneratePersonalizedChallengeOutput - The return type for the generatePersonalizedChallenge function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePersonalizedChallengeInputSchema = z.object({
  pastInteractions: z
    .string()
    .describe(
      'A summary of the couple’s past interactions and preferences within the app.'
    ),
  preferences: z
    .string()
    .describe('The couple’s specific preferences for erotic challenges.'),
});
export type GeneratePersonalizedChallengeInput = z.infer<
  typeof GeneratePersonalizedChallengeInputSchema
>;

const GeneratePersonalizedChallengeOutputSchema = z.object({
  challenge: z
    .string()
    .describe('A personalized erotic challenge for the couple.'),
});
export type GeneratePersonalizedChallengeOutput = z.infer<
  typeof GeneratePersonalizedChallengeOutputSchema
>;

export async function generatePersonalizedChallenge(
  input: GeneratePersonalizedChallengeInput
): Promise<GeneratePersonalizedChallengeOutput> {
  return generatePersonalizedChallengeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePersonalizedChallengePrompt',
  input: {schema: GeneratePersonalizedChallengeInputSchema},
  output: {schema: GeneratePersonalizedChallengeOutputSchema},
  prompt: `You are an AI assistant designed to create personalized erotic challenges for couples.

  Based on the couple's past interactions and preferences, suggest a new and exciting challenge that caters to their desires.

  Past Interactions: {{{pastInteractions}}}
  Preferences: {{{preferences}}}

  Challenge:`,
});

const generatePersonalizedChallengeFlow = ai.defineFlow(
  {
    name: 'generatePersonalizedChallengeFlow',
    inputSchema: GeneratePersonalizedChallengeInputSchema,
    outputSchema: GeneratePersonalizedChallengeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
