/**
 * VAPI AI SDK configuration
 * Initializes the VAPI client with the web token from environment variables
 * Used for AI voice conversation functionality
 */

import Vapi from '@vapi-ai/web';

// Initialize VAPI client with web token
export const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN!);