import * as yup from "yup";

const emailRegex =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

export const signUpFormSchema = yup.object().shape({
  email: yup
    .string()
    .matches(emailRegex, "Email is not valid")
    .required("Required"),
  displayName: yup.string().required("Display name required"),
  password: yup
    .string()
    .min(4, "Password must be 4 characters long")
    .required("Password required"),
  confirmPassword: yup
    .string()
    .required("Confirm password required")
    .min(4, "Password must be 4 characters long")
    .oneOf([yup.ref("password"), null], "Password must match"),
});

export const logInFormSchema = yup.object().shape({
  email: yup
    .string()
    .matches(emailRegex, "Email is not valid")
    .required("Required"),
  password: yup
    .string()
    .min(4, "Password must be 4 characters long")
    .required("Required"),
});

export const createItemFormSchema = yup.object().shape({
  date: yup.string().required("Required"),
  itemName: yup
    .string()
    .min(3, "Name must be at least 3 characters long")
    .required("Required"),
});
