import { getDalleImage } from '../api/dalleAiApi.js';
import { getStabilityImage } from '../api/stabilityAiApi.js';

// handle input and output data to generate image from AI API
export async function recipeImageController(req, res) {
  try {
    const userInputMessage = req.body.userInputMessage;
    let aiAPIResponse = {};

    // call DALL-E or Stable Difusion based on the environment variable
    if (process.env.AI_IMAGE_PROVIDER === 'DALL-E') {
      aiAPIResponse = await getDalleImage(userInputMessage);
    } else if (process.env.AI_IMAGE_PROVIDER === 'STABILITY') {
      aiAPIResponse = await getStabilityImage(userInputMessage);
    } else {
      return 'AI image provider not defined.';
    }
    return res.json(aiAPIResponse);
  } catch (err) {
    console.error('Error in the request', err);
    return res.json('Error in the request');
  }
}
