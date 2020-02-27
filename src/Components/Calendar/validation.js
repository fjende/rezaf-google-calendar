import * as Yup from 'yup';
export const ValidationSchema = Yup.object({
    title: Yup.string('').required('An event title is required'),
    start: Yup.date(),
    end: Yup.date().min(Yup.ref('start')),
});
