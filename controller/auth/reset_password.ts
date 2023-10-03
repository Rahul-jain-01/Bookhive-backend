import { Request, Response } from 'express';
import { prisma } from '../../constants';
import { StatusCode } from '../../enums/status_code';
import { _reset_password_validator } from '../../validations/auth_validator';
const bcrypt = require('bcrypt');

export const reset_password = async (req: Request, res: Response) => {
  try {
  
    const _validate_body = _reset_password_validator.validate(req.body)
    const { email , new_password , current_password  } = await  _validate_body
    const isAlrealdyExisted = await prisma.users.findUnique({
      where: { email },
    });
  
    if (!isAlrealdyExisted) {
      res.status(StatusCode.NotFound).send({
        message: 'User not found',
      });
    }
    const compare_password = await bcrypt.compare( current_password , isAlrealdyExisted?.password);

    if(!compare_password) {
      res.status(StatusCode.BadRequest).send({
        message: 'Password is not correct',
      });
      
    }


    //check if new password and old password are same thing 
    if(compare_password === new_password) {
      return res.status(StatusCode.BadRequest).send({
        message: "New password cant be same as old password"
      })
    }

    const update_password = await bcrypt.hash(new_password, 10)

    const updatePassword = await prisma.users.update({
      where:{email},
      data: {password: update_password}
    })

    if (!updatePassword) {
      return res.status(StatusCode.ServiceUnavailable).send({
        message: "Failed to update pasword"
      })
    }

   return  res.status(StatusCode.OK).send({
      message: "Password has been updated successfully"
    })


  } catch ( err ) {
    //@ts-ignore
    const errMsg = err.message
    return res.status(StatusCode.BadRequest).send({
      message: errMsg
    })
  }
};
