import * as Yup from "yup";

const transformMileage = (value: number, originalValue: string | number) => {
  if (typeof originalValue === "string") {
    const cleanStr = originalValue.replace(/,/g, "");
    return cleanStr === "" ? undefined : Number(cleanStr);
  }
  return value;
};

export const CarSearchFormSchema = (brands: string[], prices: string[]) => {
  return Yup.object().shape({
    brand: Yup.string().oneOf(brands, "select a valid value from the list"),
    price: Yup.string().oneOf(prices, "select a valid value from the list"),
    minMileage: Yup.number()
      .transform(transformMileage)
      .typeError("Enter the correct number")
      .min(0, "Mileage cannot be negative."),

    maxMileage: Yup.number()
      .transform(transformMileage)
      .typeError("Enter the correct number")
      .test(
        "is-greater",
        "The final mileage cannot be less than the initial mileage.",
        function (value) {
          const { minMileage } = this.parent;

          if (!minMileage || !value) {
            return true;
          }

          return value >= minMileage;
        },
      ),
  });
};
