import express from 'express';
import { calculateAqi } from '../controllers/aqiController.js';
import { authenticate } from '../middlewares/authenticate.js';
import { rateLimiter } from '../middlewares/rateLimiter.js';
const aqiRoute = express.Router();


aqiRoute.post('/aqi-calculator',authenticate, calculateAqi);

export default aqiRoute;