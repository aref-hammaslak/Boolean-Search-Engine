import express from 'express';
import { searchExpresion } from './controllers/search.controller';

export const router = express.Router();




router.get('comments/search', searchExpresion);