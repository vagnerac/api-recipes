import gameHandler from '../handler/gameHandler.js';

export async function gameController(req, res) {
  try {
    const requisition = req.body;
    console.log(requisition);

    const gameHandlerResponse = gameHandler(
      req.body.word,
      req.body.category,
      req.body.history,
    );

    return res.json(gameHandlerResponse);
  } catch (e) {
    console.log(e);
  }
}
async function get(req, res) {
  console.log('game get');
}
