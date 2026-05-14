export interface Car {
  id: string;
  brand: string;
  description: string;
  engine: string;
  features: string[];
  fuelConsumption: number;
  img: string;
  location: {
    adress: string;
    city: string;
    country: string;
  };
  mileage: number;
  model: string;
  rentalCompany: string;
  rentalConditions: string[];
  rentalPrice: string;
  stockNumber: number;
  type: string;
  year: number;
}

export interface CarsResponse {
  cars: Car[];
  page: string;
  totalCars: number;
  totalPages: number;
}
