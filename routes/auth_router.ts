import express from 'express';
import { create_account } from '../controller/auth/create_account';

const router = express.Router();

router.post('/auth/create_account', create_account);

export const auth_router = router;
