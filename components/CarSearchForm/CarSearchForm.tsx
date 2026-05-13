"use client";

import { Form, Formik, Field, FieldProps } from "formik";
import { useId } from "react";
import * as Yup from "yup";
import css from "./CarSearchForm.module.css";
import { useQuery } from "@tanstack/react-query";
import { fetchBrands } from "@/lib/api";

interface FormValues {
  brand: string;
  price: string;
  mileageFrom: number;
  mileageTo: number;
}

const initialValues: FormValues = {
  brand: "",
  price: "",
  mileageFrom: 0,
  mileageTo: 0,
};

const CarSearchFormSchema = Yup.object().shape({
  brand: Yup.string(),
  price: Yup.string(),
  mileageFrom: Yup.number()
    .typeError("Enter the correct number")
    .min(0, "Mileage cannot be negative."),
  mileageTo: Yup.number()
    .typeError("Enter the correct number")
    .min(
      Yup.ref("mileageFrom"),
      "The final mileage cannot be less than the initial mileage.",
    ),
});

const CarSearchForm = () => {
  const fieldId = useId();

  const {
    data: brands,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["brands"],
    queryFn: fetchBrands,
  });

  const handleSubmit = (values: FormValues) => {
    console.log(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={CarSearchFormSchema}
    >
      <Form>
        {brands && (
          <div>
            <label htmlFor={`${fieldId}-brand`}>Car brand</label>
            <Field name="brand">
              {({ field, meta }: FieldProps) => {
                const hasError = meta.touched && meta.error;
                return (
                  <>
                    <select
                      {...field}
                      id={`${fieldId}-brand`}
                      className={css["brand-select"]}
                    >
                      <option value="">Select a brand</option>
                      {brands.map((brand) => (
                        <option key={`${fieldId}-${brand}`} value={brand}>
                          {brand}
                        </option>
                      ))}
                    </select>
                    {hasError && <span className={css.span}>{meta.error}</span>}
                  </>
                );
              }}
            </Field>
          </div>
        )}
        <div>
          <label htmlFor={`${fieldId}-price`}>Choose a price</label>
          <Field name="price">
            {({ field, meta }: FieldProps) => {
              const hasError = meta.touched && meta.error;
              return (
                <>
                  <select
                    {...field}
                    id={`${fieldId}-brand`}
                    className={css["brand-select"]}
                  >
                    <option value="">Select a brand</option>
                    {brands?.map((brand) => (
                      <option key={`${fieldId}-${brand}`} value={brand}>
                        {brand}
                      </option>
                    ))}
                  </select>
                  {hasError && <span className={css.span}>{meta.error}</span>}
                </>
              );
            }}
          </Field>
        </div>
      </Form>
    </Formik>
  );
};

export default CarSearchForm;
