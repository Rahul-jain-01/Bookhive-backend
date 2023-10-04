import { Response, Request } from 'express';
import { StatusCode } from '../../enums/status_code';
import { _post_validation_schema } from '../../validations/post';
import { prisma } from '../../constants';

export const create_post = async (req: Request, res: Response) => {
  //@ts-ignore
  const userId = req?.id;
  try {
    const _validate_body = await _post_validation_schema.validate(req.body);
    // const { title , language , description, main_character, rating  } = _validate_body

    const create_post = await prisma.posts.create({
        data: {
            userId: userId,
            ..._validate_body
        }
    })

    if (!create_post) {
      return res.status(StatusCode.BadGateway).send({
        message: 'failed to create post',
      });
    }

    return res.status(StatusCode.OK).send({
      message: 'Post has been created successfully',
    });
  } catch (err) {
    //@ts-ignore
    const errMsg = err.message;
    return res.status(StatusCode.BadRequest).send({
      message: errMsg,
    });
  }
};
