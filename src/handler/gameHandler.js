import callAIApi from '../api/AIApi.js';

export default function gameHandler(word, category, history) {
  const questionsArray = [];

  questionsArray.push(
    {
      role: 'system',
      content: `We will play a guess game where you need to ask questions to try to discover the word. The category of the word is ${category}`,
    },
    { role: 'user', content: 'Guess my word' },
    // Adicione mais mensagens de histórico aqui
  );

  console.log('questionsArray After', questionsArray);

  const AIApiResponse = callAIApi(
    secretWord.word,
    secretWord.category,
    questionsArray,
  );

  // if questionsArray is not blank, then add that to the call to AIAPI call

  // then get the API response and validate that to check if it is another question or a response
}
