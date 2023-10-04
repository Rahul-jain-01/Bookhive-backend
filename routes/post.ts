import express from 'express';
import { create_post } from '../controller/post';
import { isAuthenticated } from '../middleware/isAuthenticated';

const router = express.Router();

router.post('/user/post', isAuthenticated, create_post);

export const post_router = router;
