import { Yup } from '../constants';

export const _post_validation_schema = Yup.object().shape({
  title: Yup.string().required(),
  description: Yup.string().required(),
  main_character: Yup.string(),
  language: Yup.string().required(),
  rating: Yup.number().required(),
});
