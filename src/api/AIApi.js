import axios from 'axios';
import config from './config/config.js';

// Função para enviar o histórico das perguntas e obter a próxima pergunta
async function getNextResponse(history) {
  try {
    const response = await axios.post(
      config.apiURL,
      {
        model: config.model,
        messages: config.messages,
      },
      {
        headers: {
          'Content-Type': config.contentType,
          Authorization: config.authorization,
        },
      },
    );

    const nextQuestion = response.data.choices[0].message.content;
    return nextQuestion;
  } catch (error) {
    console.error('Erro na solicitação:', error);
    return null;
  }
}

// Como usar a função
const callAIApi = async (word, category, messages) => {
  const history = [];

  messages.forEach((message) => {
    //define the message with user and message from the message paramter to become like above object.
    history.push(message);
  });

  console.log(history);

  const nextQuestion = await getNextResponse(history);
  if (nextQuestion) {
    console.log('Next question to ChatGPT: ', nextQuestion);

    return nextQuestion;
  }
};

export default callAIApi;
