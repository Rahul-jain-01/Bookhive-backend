import express from 'express';
import { create_account } from '../controller/auth/create_account';
import { login } from '../controller/auth/login';

const router = express.Router();

router.post('/auth/create_account', create_account);
router.post('/auth/login', login);

export const auth_router = router;
