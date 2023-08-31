import { getRecipes } from '../api/AICompletionApi.js';

export async function recipeController(req, res) {
  try {
    const userInputMessage = req.body.userInputMessage;

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
