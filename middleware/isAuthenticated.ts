import { NextFunction, Response, Request } from 'express';
import { StatusCode } from '../enums/status_code';
import { secretKey } from '../utils/generateRandomBytes';

const jwt = require('jsonwebtoken');
export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authorize = req.headers.authorization;
    const splitToken = authorize?.split(' ')[1];
    const verify = jwt.verify(splitToken, secretKey) as { id: string };
    //@ts-ignore
    req.id = verify;
    return next();
  } catch (err) {
    return res.status(StatusCode.Unauthorized).send({
      message: 'Unauthenticated',
    });
  }
};
