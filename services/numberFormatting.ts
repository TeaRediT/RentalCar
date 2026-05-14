import { FieldInputProps, FormikProps } from "formik";
import { ChangeEvent } from "react";

interface numberFormatingOptions {
  e: ChangeEvent<HTMLInputElement>;
  form: FormikProps<unknown>;
  field: FieldInputProps<unknown>;
}

export const numberFormating = ({ e, form, field }: numberFormatingOptions) => {
  const rawValue = e.target.value.replace(/\D/g, "");
  const limitedValue = rawValue.slice(0, 6);
  const formattedValue = limitedValue
    ? Number(limitedValue).toLocaleString("en-US")
    : "";
  form.setFieldValue(field.name, formattedValue);
};
