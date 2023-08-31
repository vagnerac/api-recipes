import axios from 'axios';
import { configCompletionAIAPI } from './config/config.js';
import { getDalleImage } from './dalleAiApi.js';
import { getStabilityImage } from './stabilityAiApi.js';

// Function to connect to ChatGPT chat completion API and send the prompt.
export async function getRecipes(userInputText) {
  try {
    const response = await axios.post(
      configCompletionAIAPI.completionAIApiURL,
      {
        messages: [
          {
            role: 'user',
            content: `Give me a recipe that have ${userInputText} as a main ingredient or include it.
            Please, respond only with the detailed receipt starting with the name of the dish in the first line of the response.
            If ${userInputText} is not an ingredient of any human food, respond with exactly the following phrase: As far as I know,
            it is not human food. Maybe eating a it won't do you any good.`,
          },
        ],
        max_tokens: configCompletionAIAPI.stabilityMaxTokens,
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
    let recipeName = '';

    const recipe = {};
    recipe.status = response.status;
    recipe.recipe = recipeReturned;

    if (response.status === 200) {
      let recipeNameBreak = recipeReturned.indexOf('\n');
      const colonSymbol = recipeReturned.indexOf(':');
      if (colonSymbol > 0 && colonSymbol < recipeNameBreak)
        recipeNameBreak = colonSymbol;
      recipeName = recipeReturned.substring(0, recipeNameBreak);

      let returnImageObject = {};
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
