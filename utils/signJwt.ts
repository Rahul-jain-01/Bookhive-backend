import { jwt } from '../requires';
import { secretKey } from './generateRandomBytes';

interface IJwtProps {
  data: any;
}

export const signJwt = (data: IJwtProps) => {
  const sign = jwt.sign(data, secretKey , {
    expiresIn: '1h'
  });

  return sign;
};
