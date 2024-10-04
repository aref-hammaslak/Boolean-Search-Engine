import express from 'express';
import { getAllComments, getCommentsCount } from './controllers/comments.controller.js';

export const router = express.Router();



router.get('/comments',getAllComments)
router.get('/comments/count', getCommentsCount)