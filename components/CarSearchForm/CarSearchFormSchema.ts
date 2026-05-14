import * as Yup from "yup";

export const CarSearchFormSchema = Yup.object().shape({
  brand: Yup.string(),
  price: Yup.string(),
  minMileage: Yup.number()
    .typeError("Enter the correct number")
    .min(0, "Mileage cannot be negative."),
  maxMileage: Yup.number()
    .typeError("Enter the correct number")
    .min(
      Yup.ref("minMileage"),
      "The final mileage cannot be less than the initial mileage.",
    ),
});
