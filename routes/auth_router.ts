import express from 'express';
import { create_account } from '../controller/auth/create_account';
import { login } from '../controller/auth/login';
import { reset_password } from '../controller/auth/reset_password';

const router = express.Router();

router.post('/auth/create_account', create_account);
router.post('/auth/login', login);
router.post('/auth/reset_password', reset_password);

export const auth_router = router;
