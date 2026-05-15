interface CarDetailsProps {
  params: Promise<{ carId: string }>;
}

const CarDetails = async ({ params }: CarDetailsProps) => {
  const { carId } = await params;

  console.log(carId);

  return <></>;
};

export default CarDetails;
