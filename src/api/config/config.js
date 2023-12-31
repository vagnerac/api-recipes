import dotenv from 'dotenv';
dotenv.config();

// config file to all APIs can be called by this application

// ChatGPT API configuration data
export const configCompletionAIAPI = {
  completionAIApiKey: process.env.AI_COMPLETION_API_KEY,
  completionAIApiURL:
    process.env.AI_COMPLETION_HOST ??
    'https://api.openai.com/v1/chat/completions',
  maxTokens: 600,
  temperature: 0.7,
  completionAIApiModel: 'gpt-3.5-turbo',
  messages: 'history',
  contentType: 'application/json',
  completionAIApiAuthorization: `Bearer ${process.env.AI_COMPLETION_API_KEY}`,
};

//DALL-E API configuration data
const dalleAiApiUrl =
  process.env.DALLE_HOST ?? 'https://api.openai.com/v1/images/generations';

export const configDalleApi = {
  dalleApiKey: process.env.AI_IMAGES_API_KEY,
  dalleApiUrl: dalleAiApiUrl,
  dalleAiApiUrl: dalleAiApiUrl,
  headers: {
    contentType: 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${process.env.DALLE_API_KEY}`,
  },
};

// Stability.ai API configuration data
const stabilityApiHost =
  process.env.STABILITY_API_HOST ?? 'https://api.stability.ai';
const stabilityApiModel = 'stable-diffusion-512-v2-1';

export const configStabilityApi = {
  stabilityApiModel: stabilityApiModel,
  stabilityApiKey: process.env.STABILITY_API_KEY,
  stabilityApiHost: stabilityApiHost,
  stabilityApiProcessUrl: `${stabilityApiHost}/v1/generation/${stabilityApiModel}/text-to-image`,
  stabilityApiAuthUrl: `${stabilityApiHost}/v1/user/account`,
  stabilityMaxTokens: process.env.STABILITY_API_MAX_TOKENS,
  stabilityStylePreset: 'cinematic',
  stabilitySamples: 1,
  stabilityHeight: 512,
  stabilityWidth: 512,
  stabilitySteps: 30,
  // cfg_scale: 7,
  // clip_guidance_preset: 'FAST_BLUE',
  headers: {
    headers: {
      contentType: 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${process.env.STABILITY_API_KEY}`,
    },
  },
};
