import * as Yup from 'yup';
export const ValidationSchema = Yup.object({
    title: Yup.string('').required('An event title is required'),
});
