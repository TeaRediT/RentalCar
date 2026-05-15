import { fetchCarById } from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

interface CarDetailsProps {
  params: Promise<{ carId: string }>;
}

const CarDetails = async ({ params }: CarDetailsProps) => {
  const { carId } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["car"],
    queryFn: () => fetchCarById(carId),
  });

  return <HydrationBoundary state={dehydrate(queryClient)}></HydrationBoundary>;
};

export default CarDetails;
