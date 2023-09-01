import fs from 'fs';
import Axios from 'axios';
import { configStabilityApi } from './config/config.js';
import { processFilePath } from './config/stabilityAiFilesPath.js';

// call Stable Difusion AI API
export async function getStabilityImage(recipeName) {
  const aiAPIConfigData = {
    engineID: configStabilityApi.stabilityApiModel,
    apiHost: configStabilityApi.stabilityApiHost,
    apiAuthURL: configStabilityApi.stabilityApiAuthUrl,
    apiProcessURL: configStabilityApi.stabilityApiProcessUrl,
    apiKey: configStabilityApi.stabilityApiKey,
    headers: configStabilityApi.headers,
    body: {
      text_prompts: [
        {
          text: `Professional image of this dish: ${recipeName}`,
        },
      ],
    },
    style_preset: configStabilityApi.stabilityStylePreset,
    samples: configStabilityApi.stabilitySamples,
    height: configStabilityApi.stabilityHeight,
    width: configStabilityApi.stabilityWidth,
    steps: configStabilityApi.stabilitySteps,
  };

  if (!configStabilityApi.stabilityApiKey)
    throw new Error('Missing AI API key.');

  return await Axios.post(
    configStabilityApi.stabilityApiProcessUrl,
    aiAPIConfigData.body,
    aiAPIConfigData.headers,
  )
    .then(async (response) => {
      const responseJSON = response.data;
      // Make below call active if file to be written in a local folder in the server.
      await writeAIFile(responseJSON);

      const responseStatus =
        responseJSON.artifacts[0].finishReason === 'SUCCESS' ? 200 : 0;

      const responseObject = {
        imageFormat: 'base64',
        imageData: responseJSON.artifacts[0].base64,
        status: responseStatus,
      };

      return responseObject;
    })
    .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        return { error: error.response, status: error.status };
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
        return { error: error.response, status: error.status };
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
        return { error: error.response, status: error.status };
      }
    });
}

// function to write file returned in base64 format from API in the defined location
async function writeAIFile(responseJSON) {
  responseJSON.artifacts.forEach(async (image) => {
    const filePath = processFilePath('png').locationPath;
    fs.writeFileSync(filePath, Buffer.from(image.base64, 'base64'));
  });
}
