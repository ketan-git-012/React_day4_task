import * as Yup from 'yup';

const ValidationSchema = Yup.object().shape({
    name : Yup.string().min(3, 'Too Short!').max(50,'Too Long!').required('Name is required!'),
    game : Yup.string().required('Game name is required!'),
    cricket : Yup.string().required('Please choose one!'),
    football : Yup.string().required('Please choose one!')
})

export default ValidationSchema;