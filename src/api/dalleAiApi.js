import axios from 'axios';
import { configDalleApi } from './config/config.js';

// Function to connect to DALL-E API and send the prompt.
export async function getDalleImage(recipe) {
  try {
    const response = await axios.post(
      configDalleApi.dalleAiApiUrl,
      {
        prompt: `Give me a professional image of the following dish: ${recipe}`,
        n: 1,
        size: '256x256',
      },
      {
        headers: {
          'Content-Type': configDalleApi.headers.contentType,
          Authorization: configDalleApi.headers.Authorization,
        },
      },
    );

    const image = {
      imageFormat: 'URL',
      imageData: response.data.data[0].url,
      status: response.status,
    };

    return image;
  } catch (error) {
    if (error.response) {
      console.error('Error in the response:', error);
      return { error: error.response, status: error.status };
    } else if (error.request) {
      console.error('Error in the request:', error);
      return { error: error.request, status: error.status };
    } else if (error.message) {
      console.error('Error in the message:', error);
      return { error: error.message, status: error.status };
    }
  }
}
