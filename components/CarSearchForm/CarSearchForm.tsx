"use client";

import { Form, Formik, Field, FieldProps } from "formik";
import { useId, useMemo } from "react";
import css from "./CarSearchForm.module.css";
import { useQuery } from "@tanstack/react-query";
import { fetchFilters } from "@/lib/api";
import Select from "react-select";
import { ActiveFilters } from "@/types/filter";
import { carSearchFormSchema } from "./CarSearchFormSchema";
import { generatePrices } from "@/services/generatePricesByRange";
import CustomChevron from "../CustomChevron/CustomChevron";
import { numberFormating } from "@/services/numberFormatting";
import Button from "../Button/Button";

export interface SelectOption {
  label: string;
  value: string;
}

interface CarSearchFormProps {
  handleSubmit: (values: ActiveFilters) => void;
  isSearching: boolean;
}

const initialValues: ActiveFilters = {
  brand: "",
  price: "",
  minMileage: "",
  maxMileage: "",
};

const CarSearchForm = ({ handleSubmit, isSearching }: CarSearchFormProps) => {
  const fieldId = useId();

  const { data, isLoading, error } = useQuery({
    queryKey: ["filters"],
    queryFn: fetchFilters,
    refetchOnMount: false,
  });

  const { brands, brandOptions, prices, priceOptions } = useMemo(() => {
    if (!data)
      return { brands: [], brandOptions: [], prices: [], priceOptions: [] };

    const mappedBrandOptions = data.brands.map((brand: string) => ({
      label: brand,
      value: brand,
    }));

    const generatedPrices = generatePrices({
      min: data.price.min,
      max: data.price.max,
      step: 10,
    });

    const mappedPriceOptions = generatedPrices.map((price: string) => ({
      label: price,
      value: price,
    }));

    return {
      brands: data.brands,
      brandOptions: mappedBrandOptions,
      prices: generatedPrices,
      priceOptions: mappedPriceOptions,
    };
  }, [data]);

  const onFormSubmit = (values: ActiveFilters) => {
    const cleanValues = {
      ...values,
      minMileage: values.minMileage ? values.minMileage.replace(/,/g, "") : "",
      maxMileage: values.maxMileage ? values.maxMileage.replace(/,/g, "") : "",
    };
    handleSubmit(cleanValues);
  };

  if (isLoading) {
    return <h3>Loading filters...</h3>;
  }

  if (error) {
    return <h3>Something went wrong while searching filters.</h3>;
  }

  return (
    <>
      {data && (
        <Formik
          initialValues={initialValues}
          onSubmit={onFormSubmit}
          validationSchema={() => carSearchFormSchema(brands, prices)}
        >
          <Form className={css.form}>
            {brandOptions && (
              <div>
                <label htmlFor={`${fieldId}-brand`}>Car brand</label>
                <div className={css["select-wrapper"]}>
                  <Field name="brand">
                    {({ field, form, meta }: FieldProps) => {
                      const hasError = meta.touched && meta.error;

                      const selectedOption =
                        brandOptions.find(
                          (option) => option.value === field.value,
                        ) || null;
                      return (
                        <>
                          <Select
                            className={`${css["select-container"]} ${css["brand-select-container"]}`}
                            classNamePrefix={`select`}
                            instanceId={`${fieldId}-brand-select`}
                            inputId={`${fieldId}-brand`}
                            options={brandOptions}
                            value={selectedOption}
                            placeholder="Choose a brand"
                            onChange={(option) =>
                              form.setFieldValue(
                                field.name,
                                option ? option.value : "",
                              )
                            }
                            onBlur={() =>
                              form.setFieldTouched(field.name, true)
                            }
                            isSearchable={false}
                            components={{
                              DropdownIndicator: CustomChevron,
                              IndicatorSeparator: () => null,
                            }}
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
            )}
            <div>
              <label htmlFor={`${fieldId}-price`}>Price/ 1 hour</label>
              <div className={css["select-wrapper"]}>
                <Field name="price">
                  {({ field, form, meta }: FieldProps) => {
                    const hasError = meta.touched && meta.error;

                    const selectedOption =
                      priceOptions.find(
                        (option) => option.value === field.value,
                      ) || null;
                    return (
                      <>
                        <Select
                          className={`${css["select-container"]} ${css["price-select-container"]}`}
                          classNamePrefix={`select`}
                          instanceId={`${fieldId}-price-select`}
                          inputId={`${fieldId}-price`}
                          options={priceOptions}
                          value={selectedOption}
                          placeholder="Choose a price"
                          onChange={(option) =>
                            form.setFieldValue(
                              field.name,
                              option ? option.value : "",
                            )
                          }
                          formatOptionLabel={(option, { context }) => {
                            if (context === "value") {
                              return `To $${option.value}`;
                            }
                            return option.label;
                          }}
                          onBlur={() => form.setFieldTouched(field.name, true)}
                          isSearchable={false}
                          components={{
                            DropdownIndicator: CustomChevron,
                            IndicatorSeparator: () => null,
                          }}
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
            <div className={css["mileage-group"]}>
              <div className={css["input-with-label"]}>
                <label htmlFor={`${fieldId}-mileage-from`}>
                  Сar mileage / km
                </label>
                <div className={css["input-wrapper"]}>
                  <span className={css.prefix}>From</span>
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
                            onChange={(e) =>
                              numberFormating({ e, form, field })
                            }
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

              <div>
                <label
                  htmlFor={`${fieldId}-mileage-to`}
                  className="visually-hidden"
                >
                  Car mileage to
                </label>
                <div className={css["input-wrapper"]}>
                  <span className={css.prefix}>To</span>
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
                            onChange={(e) =>
                              numberFormating({ e, form, field })
                            }
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
            </div>
            <Button disabled={isSearching} type="submit">
              {isSearching ? "Searching..." : "Search"}
            </Button>
          </Form>
        </Formik>
      )}
    </>
  );
};

export default CarSearchForm;
