import { fetchCarById } from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import CarDetailsClient from "./CarDetails.client";

interface CarDetailsProps {
  params: Promise<{ carId: string }>;
}

const CarDetails = async ({ params }: CarDetailsProps) => {
  const { carId } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["car", carId],
    queryFn: () => fetchCarById(carId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CarDetailsClient />
    </HydrationBoundary>
  );
};

export default CarDetails;
