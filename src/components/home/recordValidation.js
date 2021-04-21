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

const traineeValidation = {
    firstname : Yup.string()
                .required("Firstname is Required!"),
    lastname : Yup.string()
                .required("Lastname is Required!"),
    email : Yup.string()
                .required("Email is Required!")
                .email("Email is invalid")
}

export  {
    recordValidation,
    traineeValidation
};