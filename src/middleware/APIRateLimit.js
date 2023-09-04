import rateLimit from 'express-rate-limit';

// set rate limit with defined parameters
export const APIRateLimit = rateLimit({
  windowMs: 24 * 60 * 60 * 1000,
  max: 5,
  message:
    'You already got 5 recipes. Try to cook those and get more in 24 hours.',
  standardHeaders: true,
  legacyHeaders: false,
});
