import axios from 'axios';
import { configCompletionAIAPI } from './config/config.js';
import { getDalleImage } from './dalleAiApi.js';
import { getStabilityImage } from './stabilityAiApi.js';

// Function to connect to ChatGPT chat completion API and send the prompt.
export async function getRecipes(userInputText) {
  try {
    const inputText = userInputText;
    // call completion ChatGPT API to pass the input parameter and get the recipe in the response.
    const response = await axios.post(
      configCompletionAIAPI.completionAIApiURL,
      {
        messages: [
          {
            role: 'user',
            // trying to put entire user prompt in the same request to make it simpler and have more control of the completion and costs.
            // negative aspect is that, validation of the input is done in the same prompt it is returned the recipe.
            // It can be improved to have only one responsibility by each API call and first validate the input.
            content: `I will ask you a question that, if the response is positive, you may respond only the text of one recipe that contains ${inputText} as ingredient.
            Else, return only with the this phrase: Error: As far as I know, it is not human food. Maybe eating ${inputText} won't do you any good.
            This is the question: Is there only the name of a human food in the following string: ${inputText}`,
          },
        ],
        max_tokens: configCompletionAIAPI.maxTokens,
        model: configCompletionAIAPI.completionAIApiModel,
      },
      {
        headers: {
          'Content-Type': configCompletionAIAPI.contentType,
          Authorization: configCompletionAIAPI.completionAIApiAuthorization,
        },
      },
    );

    const recipeReturned = response.data.choices[0].message.content;

    // create object to return data
    const recipe = {
      status: response.status,
      recipe: recipeReturned,
    };

    // call image API only if the return of the completion API is success or a recipe is returned
    // it is good to save money, as all calls have costs
    if (response.status === 200 && !recipe.recipe.startsWith('Error')) {
      let recipeNameBreak = recipeReturned.indexOf('\n');
      const colonSymbol = recipeReturned.indexOf(':');
      if (colonSymbol > 0 && colonSymbol < recipeNameBreak)
        recipeNameBreak = colonSymbol;
      let recipeName = recipeReturned.substring(0, recipeNameBreak);

      let returnImageObject = {};

      // below condition define which image AI API will be called
      if (process.env.AI_IMAGE_PROVIDER === 'DALL-E') {
        returnImageObject = await getDalleImage(recipeName);
      } else if (process.env.AI_IMAGE_PROVIDER === 'STABILITY') {
        returnImageObject = await getStabilityImage(recipeName);
      } else {
        return 'AI image provider not defined.';
      }

      recipe.name = recipeName;
      recipe.image = returnImageObject;
    }
    console.log(recipe);

    const data = { recipe: recipe };

    return data;
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
