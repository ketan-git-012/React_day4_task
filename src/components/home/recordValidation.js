import * as Yup from 'yup';

const recordValidation = {
    matches : Yup.string()
              .required("Name is Required!"),
    runs : Yup.string()
                .required("Email is reuqired!"),
    highScore : Yup.string()
                  .required("Password is required!"),
    strikeRate : Yup.string()
                         .required("Password is Required")
}

export default recordValidation;