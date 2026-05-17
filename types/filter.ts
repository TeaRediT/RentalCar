export const defaultFilter = {
  brand: "",
  price: "",
  minMileage: "",
  maxMileage: "",
};

export interface ActiveFilters {
  brand: string;
  price: string;
  minMileage: string;
  maxMileage: string;
}

export interface FiltersRes {
  brands: string[];
  price: { min: number; max: number };
}
