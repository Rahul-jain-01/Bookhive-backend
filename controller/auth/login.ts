import { Request, Response } from 'express';
import { _login_validator } from '../../validations/auth_validator';
import { PrismaClient } from '@prisma/client';
import { StatusCode } from '../../enums/status_code';
import { signJwt } from '../../utils/signJwt';
const bcrypt = require('bcrypt');


const prisma = new PrismaClient();
export const login = async (req: Request, res: Response) => {
  const validate_body = await _login_validator.validate(req.body);
  const { email, password } = validate_body;
  try {
    const isExisted = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });

    if (!isExisted) {
      return res.status(StatusCode.NotFound).send({
        error: 'Email dosnt exist',
      });
    }
    const compare_password = await bcrypt.compare(password, isExisted.password);

    if (!compare_password) {
      return res.status(StatusCode.BadRequest).send({
        error: 'Password is not correct',
      });
    }


    const jwtData = signJwt({
      data: 'hello world'
    } )
    return res.status(StatusCode.OK).send({
      message: 'Logged in successfully',
      token: jwtData
    });
  } catch (err) {
    //@ts-ignore
    const errMsg = err?.message;
    return res.status(StatusCode.BadRequest).json({
      error: errMsg,
    });
  }
};
