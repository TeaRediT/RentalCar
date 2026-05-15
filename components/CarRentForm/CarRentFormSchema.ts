import * as Yup from "yup";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const carRentFormSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is a required field.")
    .min(3, "Name must contain at least 3 characters")
    .max(50, "The name is too long."),
  email: Yup.string()
    .matches(emailRegex, "Incorrect email format")
    .required("Email is a required field.")
    .max(50, "The email is too long."),
  comment: Yup.string().max(500, "Comment cannot exceed 500 characters."),
});
