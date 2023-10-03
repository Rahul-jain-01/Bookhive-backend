import { Request, Response } from 'express';
import { _create_account_validator } from '../../validations/auth_validator';
import { prisma } from '../../constants';
import bcrypt from 'bcrypt';


export const create_account = async (req: Request, res: Response) => {
  try {
    const validate_item = await _create_account_validator.validate(req.body);
    const { email, password, first_name, last_name, gender } = validate_item;
    const hashPassword = await bcrypt.hash(password, 10);
    const add_user = await prisma.users.create({
      data: {
        email:email,
        gender:gender,
        firstName: first_name,
        lastName: last_name,
        password: hashPassword,
      },
    });

    if (!add_user) {
      return res.status(403).json({ message: 'Failed to create user' });
    }

    return res.status(201).json({ message: 'User has been created successfully' });
  } catch (err) {
    //@ts-ignore
    const errMsg = err.message;
    return res.status(400).json({
      message: errMsg,
    });
  }
};
