"use client";

import { Form, Formik, Field, FieldProps } from "formik";
import { useId } from "react";
import css from "./CarSearchForm.module.css";
import { useQuery } from "@tanstack/react-query";
import { fetchBrands } from "@/lib/api";
import Select from "react-select";
import { activeFilters } from "@/types/filter";
import { CarSearchFormSchema } from "./CarSearchFormSchema";

interface CarSearchFormProps {
  handleSubmit: (values: activeFilters) => void;
}

const initialValues: activeFilters = {
  brand: "",
  rentalPrice: "",
  minMileage: "",
  maxMileage: "",
};

const rentPrices = ["30", "40", "50", "60", "70", "80", "90", "100", "150"];

const CarSearchForm = ({ handleSubmit }: CarSearchFormProps) => {
  const fieldId = useId();

  const {
    data: brands,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["brands"],
    queryFn: fetchBrands,
  });

  const brandOptions = brands?.map((brand) => {
    return { label: brand, value: brand };
  });

  const priceOptions = rentPrices.map((price) => {
    return { label: price, value: price };
  });

  const onFormSubmit = (values: activeFilters) => {
    handleSubmit(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onFormSubmit}
      validationSchema={CarSearchFormSchema}
    >
      <Form>
        {brandOptions && (
          <div>
            <label htmlFor={`${fieldId}-brand`}>Car brand</label>
            <Field name="brand">
              {({ field, form, meta }: FieldProps) => {
                const hasError = meta.touched && meta.error;

                const selectedOption =
                  brandOptions.find((option) => option.value === field.value) ||
                  null;
                return (
                  <>
                    <Select
                      className={css["brand-select"]}
                      instanceId={`${fieldId}-brand-select`}
                      inputId={`${fieldId}-brand`}
                      options={brandOptions}
                      value={selectedOption}
                      onChange={(option) =>
                        form.setFieldValue(
                          field.name,
                          option ? option.value : "",
                        )
                      }
                      onBlur={() => form.setFieldTouched(field.name, true)}
                      placeholder="Choose a brand"
                    />
                    {hasError && <span className={css.span}>{meta.error}</span>}
                  </>
                );
              }}
            </Field>
          </div>
        )}
        <div>
          <label htmlFor={`${fieldId}-price`}>Price/ 1 hour</label>
          <Field name="rentalPrice">
            {({ field, form, meta }: FieldProps) => {
              const hasError = meta.touched && meta.error;

              const selectedOption =
                priceOptions.find((option) => option.value === field.value) ||
                null;
              return (
                <>
                  <Select
                    className={css["price-select"]}
                    instanceId={`${fieldId}-price-select`}
                    inputId={`${fieldId}-price`}
                    options={priceOptions}
                    value={selectedOption}
                    onChange={(option) =>
                      form.setFieldValue(field.name, option ? option.value : "")
                    }
                    formatOptionLabel={(option, { context }) => {
                      if (context === "value") {
                        return `To $${option.value}`;
                      }
                      return option.label;
                    }}
                    onBlur={() => form.setFieldTouched(field.name, true)}
                    placeholder="Choose a price"
                  />
                  {hasError && <span className={css.span}>{meta.error}</span>}
                </>
              );
            }}
          </Field>
        </div>
        <div>
          <div>
            <label htmlFor={`${fieldId}-mileage-from`}>Сar mileage / km</label>
            <Field name="minMileage">
              {({ field, form, meta }: FieldProps) => {
                const hasError = meta.touched && meta.error;
                return (
                  <>
                    <input
                      {...field}
                      type="text"
                      id={`${fieldId}-mileage-from`}
                      autoComplete={"mileage-from"}
                      className={css.input}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\s/g, "").trim();
                        form.setFieldValue(field.name, value);
                      }}
                    />
                    {hasError && <span className={css.span}>{meta.error}</span>}
                  </>
                );
              }}
            </Field>
          </div>
          <div>
            <label htmlFor={`${fieldId}-mileage-to`}></label>
            <Field name="maxMileage">
              {({ field, form, meta }: FieldProps) => {
                const hasError = meta.touched && meta.error;
                return (
                  <>
                    <input
                      {...field}
                      type="text"
                      id={`${fieldId}-mileage-to`}
                      autoComplete={"mileage-to"}
                      className={css.input}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\s/g, "").trim();
                        form.setFieldValue(field.name, value);
                      }}
                    />
                    {hasError && <span className={css.span}>{meta.error}</span>}
                  </>
                );
              }}
            </Field>
          </div>
        </div>
        <button type="submit">Search</button>
      </Form>
    </Formik>
  );
};

export default CarSearchForm;
