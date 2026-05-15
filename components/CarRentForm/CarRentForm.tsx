"use client";

import { Field, FieldProps, Form, Formik } from "formik";
import css from "./CarRentForm.module.css";
import { useId } from "react";
import Button from "../Button/Button";
import { carRentFormSchema } from "./CarRentFormSchema";
import { useMutation } from "@tanstack/react-query";
import { createBooking } from "@/lib/api";
import { BookingBody } from "@/types/booking";

interface CarRentFormProps {
  carId: string;
}

const initialValues = {
  name: "",
  email: "",
  comment: "",
};

const CarRentForm = ({ carId }: CarRentFormProps) => {
  const fieldId = useId();

  const { mutate, isPending } = useMutation({
    mutationFn: ({ carId, payload }: { carId: string; payload: BookingBody }) =>
      createBooking(carId, payload),
    onSuccess: () => {
      console.log("yes");
    },
    onError: () => {
      console.log("no");
    },
  });

  const handleSubmit = (values: BookingBody) => {
    const { comment, ...restValues } = values;
    const payload = comment?.trim() === "" ? restValues : values;

    mutate({ carId, payload: payload });
  };

  return (
    <>
      <div className={css["form-wrapper"]}>
        <h2 className={css.title}>Book your car now</h2>
        <p className={css["sub-title"]}>
          Stay connected! We are always ready to help you.
        </p>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={carRentFormSchema}
        >
          <Form className={css.form}>
            <div className={css.fields}>
              <div className={css["field-set"]}>
                <label htmlFor={`${fieldId}-name`}></label>
                <Field name="name">
                  {({ field, meta }: FieldProps) => {
                    const hasError = meta.touched && meta.error;
                    return (
                      <>
                        <input
                          {...field}
                          type="text"
                          id={`${fieldId}-name`}
                          placeholder={"Name*"}
                          autoComplete={"username"}
                          className={css.input}
                        />
                        {hasError && (
                          <span className={css.error}>{meta.error}</span>
                        )}
                      </>
                    );
                  }}
                </Field>
              </div>
              <div className={css["field-set"]}>
                <label htmlFor={`${fieldId}-email`}></label>
                <Field name="email">
                  {({ field, meta }: FieldProps) => {
                    const hasError = meta.touched && meta.error;
                    return (
                      <>
                        <input
                          {...field}
                          type="email"
                          id={`${fieldId}-email`}
                          placeholder={"Email*"}
                          autoComplete={"email"}
                          className={css.input}
                        />
                        {hasError && (
                          <span className={css.error}>{meta.error}</span>
                        )}
                      </>
                    );
                  }}
                </Field>
              </div>
              <div className={css["field-set"]}>
                <label htmlFor={`${fieldId}-comment`}></label>
                <Field name="comment">
                  {({ field, meta }: FieldProps) => {
                    const hasError = meta.touched && meta.error;
                    return (
                      <>
                        <textarea
                          {...field}
                          id={`${fieldId}-comment`}
                          placeholder={"Comment"}
                          className={css.textarea}
                        />
                        {hasError && (
                          <span className={css.error}>{meta.error}</span>
                        )}
                      </>
                    );
                  }}
                </Field>
              </div>
            </div>
            <Button className={css.button} type="submit">
              Send
            </Button>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default CarRentForm;
