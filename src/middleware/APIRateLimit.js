import rateLimit from 'express-rate-limit';

export const APIRateLimit = rateLimit({
  windowMs: 24 * 60 * 60 * 1000,
  max: 2,
  message:
    'You already got 2 recipes. Try to cook those and get more in 24 hours.',
  standardHeaders: true,
  legacyHeaders: false,
});
