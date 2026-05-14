interface GeneratePricesInterface {
  min: number;
  max: number;
  step: number;
}

export const generatePrices = ({ min, max, step }: GeneratePricesInterface) => {
  const res = [];

  for (let i = min; i <= max; i += step) {
    res.push(i.toString());
  }

  return res;
};
