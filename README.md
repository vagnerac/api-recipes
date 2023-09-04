# What Recipes

A learning purpose API that provide recipes and images generated by AI.

## Description

An API that receives an ingredient as input, get a recipe from ChatGPT API and then generate an image to that recipe from a text to image AI. Currently it is supported DALL-E and Stable Difusion text to image AIs to generate image to the recipes.
Project is written in javascript through NodeJS using Express, Axios and other extensions.
Case image is generated in a base64 format, it is stored in a local folder, but the response in the API is the base64 code. So local folder is just a backup.

## Getting Started

### Dependencies

* It is a simple NodeJS project. So you need it installed.
* All dependencies can be installed after downloading the project as described below.
```
  "devDependencies": {
    "eslint": "^8.24.0",
    "eslint-config-airbnb-base": "^15.0.0",
    "eslint-plugin-import": "^2.26.0",
    "nodemon": "^3.0.1",
    "prettier": "^3.0.2",
    "sucrase": "^3.34.0"
  },
  "dependencies": {
    "axios": "^1.4.0",
    "cookie-session": "^2.0.0",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "eslint-config-prettier": "^9.0.0",
    "eslint-plugin-prettier": "^5.0.0",
    "express": "^4.18.2",
    "express-rate-limit": "^6.9.0",
    "fs": "^0.0.1-security",
    "helmet": "^7.0.0"
  }
```

### Installing

Clone the repository, install node packages and verify routes locally
```
git clone https://github.com/vagnerac/what-recipes
cd what-recipes
npm install
npm run dev
```
### Executing program
* It is necessary to create a .env file and define PORT there.
  ```
  PORT=3000
  ```
* Open your local browser and verify the what-recipes is working by accessing:
  ```
  http://localhost:3000/
  ```
* After above steps, the you need to setup your data to process AI APIs requests. It is done in the src/api/config/config.js and .env files
* .ENV:
  ```
  AI_COMPLETION_API_KEY=
  AI_COMPLETION_HOST=
  DALLE_API_KEY=
  DALLE_HOST=
  AI_IMAGE_PROVIDER=
  STABILITY_API_HOST=
  STABILITY_API_KEY=
  STABILITY_API_MAX_TOKENS=
  COOKIE_KEY=
  COOKIE_SESSION_NAME=
  NODE_ENV=
  ```
  * In the AI_IMAGE_PROVIDER parameter, set STABILITY or DALL-E, depending on the provider you will use.
* Then you can setup the endpoints in an application like Postman, SoapUI or Insomnia to send request.

## Authors

Vagner Coelho  
[@vagnerac](https://github.com/vagnerac)

## Version History

* 0.1
    * First implementation
