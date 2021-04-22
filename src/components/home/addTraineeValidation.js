import * as Yup from "yup";

const traineeValidation = {
  firstname: Yup.string()
    .min(2, "minimum 2 characters required!")
    .required("Name is Required!"),
  lastname: Yup.string()
    .min(2, "minimum 2 characters required!")
    .required("Name is Required!"),
  email: Yup.string()
    .email("Email is not valid!")
    .required("Email is reuqired!"),
  image: Yup.string()
    .min(2, "minimum 2 characters required!")
    .required("Name is Required!"),
};

export default traineeValidation;
