import { getRecipes } from '../api/AICompletionApi.js';

// controller to handle input and output of the recipe API and AI API dta in the return
export async function recipeController(req, res) {
  try {
    const userInputMessage = req.body.userInputMessage;

    if (userInputMessage.length > 20)
      return res.json({ recipe: 'Ingredient informed is not valid.' });

    const aiAPIResponse = await getRecipes(userInputMessage);

    return res.json(aiAPIResponse);
  } catch (err) {
    console.error('Error in the request', err);
    return res.json('erro na API');
  }
}
export async function get(req, res) {
  console.log('game get');
}
