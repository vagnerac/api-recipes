const config = {
  apiKey: process.env.AI_API_KEY,
  apiURL: process.env.AI_API_URL,
  model: 'gpt-3.5-turbo',
  messages: 'history',
  contentType: 'application/json',
  authorization: `Bearer ${process.env.AI_API_KEY}`,
};

export default config;
