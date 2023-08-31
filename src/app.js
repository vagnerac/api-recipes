import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieSession from 'cookie-session';
import homeRoutes from './routes/homeRoutes.js';
import recipeRoutes from './routes/recipeRoutes.js';
import recipeImageRoutes from './routes/recipeImageRoutes.js';

export const PORT = process.env.PORT;
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

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors(corsOptions));
    this.app.use(helmet());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.set('json spaces', 2);
    this.app.use(
      cookieSession({
        name: process.env.COOKIE_SESSION_NAME,
        keys: [process.env.COOKIE_KEY], // should use as secret environment variable
        secure: process.env.NODE_ENV === 'development' ? false : true,
        httpOnly: process.env.NODE_ENV === 'development' ? false : true,
        sameSite: process.env.NODE_ENV === 'development' ? false : 'none',
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
      }),
    );
  }

  routes() {
    this.app.use('/', homeRoutes);
    this.app.use('/recipe/', recipeRoutes);
    this.app.use('/recipeImage/', recipeImageRoutes);
  }
}

export default new App().app;
