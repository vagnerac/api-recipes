import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import cookieSession from 'cookie-session';
import homeRoutes from './routes/homeRoutes.js';
import gameRoutes from './routes/gameRoutes.js';

export const PORT = process.env.PORT || 8080;
const whiteList = [`http://localhost:${PORT}`];

const corsOptions = {
  origin(origin, callback) {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

export const app = express();
middlewares(app);
routes(app);

function middlewares(app) {
  app.use(cors(corsOptions));
  //     this.app.use(helmet());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(
    cookieSession({
      name: process.env.COOKIE_SESSION_NAME,
      keys: [process.env.COOKIE_KEY], // should use as secret environment variable
      httpOnly: true,
    }),
  );
}

function routes(app) {
  app.use('/', homeRoutes);
  app.use('/game', gameRoutes);
}
