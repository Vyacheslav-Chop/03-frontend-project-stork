import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Metadata } from "next";
import JourneyClient from "../JourneyClient";
import { fetchWeekDataServer } from "@/lib/api/apiServer";
import { WeekData } from "@/types/journey";


type JourneyPageProps = {
  params: { weekNumber: string };
};

export async function generateMetadata({
  params,
}: JourneyPageProps): Promise<Metadata> {
  const weekNumber = Number(params.weekNumber);
  const data: WeekData = await fetchWeekDataServer(weekNumber);

  return {
    title: `Тиждень ${data.weekNumber}: ${data.title}`,
    description: data.description,
    openGraph: {
      title: `Тиждень ${data.weekNumber}: ${data.title}`,
      description: data.description,
      url: `https://your-domain.com/journey/${data.weekNumber}`,  /////
      images: [
        {
          url: "/images/og.png",
          width: 1200,
          height: 630,
          alt: "Journey Pregnancy Tracker",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Тиждень ${data.weekNumber}: ${data.title}`,
      description: data.description,
      images: ["/images/og.png"],
    },
  };
}

export default async function JourneyPage({ params }: JourneyPageProps) {
  const weekNumber = Number(params.weekNumber);

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["week", weekNumber],
    queryFn: () => fetchWeekDataServer(weekNumber),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <JourneyClient initialWeek={weekNumber} />
    </HydrationBoundary>
  );
}



