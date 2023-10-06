import express from 'express';
import { create_account } from '../controller/auth/create_account';
import { login } from '../controller/auth/login';
import { reset_password } from '../controller/auth/reset_password';
import {generate_otp} from '../controller/auth/generate_otp';
import {verify_otp} from '../controller/auth/verify_otp';
const router = express.Router();

router.post('/auth/create_account', create_account);
router.post('/auth/login', login);
router.post('/auth/reset_password', reset_password);
router.post('/auth/generate_otp', generate_otp);
router.post('/auth/verify_otp',verify_otp);

export const auth_router = router;
