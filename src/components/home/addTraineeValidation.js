import * as Yup from 'yup';

const traineeValidation = {
    name : Yup.string()
              .min(2, "minimum 2 characters required!")
              .required("Name is Required!"),
    email : Yup.string()
                .email("Email is not valid!")
                .required("Email is reuqired!"),
    password : Yup.string()
                  .min(8, "Password must contained atleast 8 characters!")
                  .required("Password is required!"),
    confirmpassword : Yup.string()
                         .oneOf([Yup.ref("password")], "Password doesnt match!")
                         .required("Password is Required")
}

export default traineeValidation;