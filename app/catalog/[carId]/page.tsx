import { fetchCarById } from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import CarDetailsClient from "./CarDetails.client";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface CarDetailsProps {
  params: Promise<{ carId: string }>;
}

export async function generateMetadata({
  params,
}: CarDetailsProps): Promise<Metadata> {
  const { carId } = await params;

  try {
    const car = await fetchCarById(carId);

    return {
      title: `${car.brand} ${car.model} | RentalCar`,
      description: `Rent a ${car.brand} ${car.model} (${car.year}) for just $${car.rentalPrice}. Location: ${car.location.city}, ${car.location.country}. Check rental conditions and book today!`,
      openGraph: {
        title: `Rent ${car.brand} ${car.model} | RentalCar`,
        description: `Looking for a car? Rent this ${car.brand} ${car.model} with ${car.mileage.toLocaleString("en-US")} km mileage.`,
        images: car.img
          ? [
              {
                url: car.img,
                width: 1200,
                height: 630,
                alt: "car img",
              },
            ]
          : [],
      },
    };
  } catch {
    return {
      title: "Car Details",
      description:
        "Detailed information and rental conditions for the selected car.",
    };
  }
}

const CarDetails = async ({ params }: CarDetailsProps) => {
  const { carId } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["car", carId],
    queryFn: () => fetchCarById(carId),
  });

  const carData = queryClient.getQueryData(["car", carId]);
  const queryState = queryClient.getQueryState(["car", carId]);

  if (!carData || queryState?.status === "error") {
    notFound();
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CarDetailsClient />
    </HydrationBoundary>
  );
};

export default CarDetails;
