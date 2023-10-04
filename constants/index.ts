import * as yup from 'yup';
import { PrismaClient } from '@prisma/client';
export const prisma = new PrismaClient();

export const Yup = yup;
