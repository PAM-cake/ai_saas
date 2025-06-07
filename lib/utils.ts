import { subjectsColors, voices } from "@/constants"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { CreateAssistantDTO } from "@vapi-ai/web/dist/api";

/**
 * Utility function to merge Tailwind CSS classes with proper precedence
 * @param inputs - Class values to be merged
 * @returns Merged class string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Gets the color associated with a subject
 * @param subject - The subject to get the color for
 * @returns The hex color code for the subject
 */
export const getSubjectColor = (subject: string): string => {
  return subjectsColors[subject as keyof typeof subjectsColors]
} // Default color if subject not found

/**
 * Configures an AI assistant with specific voice and style settings
 * @param voice - The voice type to use
 * @param style - The conversation style to use
 * @returns Configured assistant DTO for the VAPI AI service
 */
export const configureAssistant = (voice: string, style: string) => {
  // Get the appropriate voice ID based on voice and style
  const voiceId = voices[voice as keyof typeof voices][
          style as keyof (typeof voices)[keyof typeof voices]
          ] || "sarah";

  // Configure the VAPI assistant with specific settings
  const vapiAssistant: CreateAssistantDTO = {
    name: "Companion",
    firstMessage:
        "Hello, let's start the session. Today we'll be talking about {{topic}}.",
    transcriber: {
      provider: "deepgram",
      model: "nova-3",
      language: "en",
    },
    voice: {
      provider: "11labs",
      voiceId: voiceId,
      stability: 0.4,
      similarityBoost: 0.8,
      speed: 1,
      style: 0.5,
      useSpeakerBoost: true,
    },
    model: {
      provider: "openai",
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are a highly knowledgeable tutor teaching a real-time voice session with a student. Your goal is to teach the student about the topic and subject.

                    Tutor Guidelines:
                    Stick to the given topic - {{ topic }} and subject - {{ subject }} and teach the student about it.
                    Keep the conversation flowing smoothly while maintaining control.
                    From time to time make sure that the student is following you and understands you.
                    Break down the topic into smaller parts and teach the student one part at a time.
                    Keep your style of conversation {{ style }}.
                    Keep your responses short, like in a real voice conversation.
                    Do not include any special characters in your responses - this is a voice conversation.
              `,
        },
      ],
    },
    clientMessages: [],
    serverMessages: [],
  };
  return vapiAssistant;
};