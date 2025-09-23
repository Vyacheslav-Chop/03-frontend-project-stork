export type JourneyPageProps = {
  params: { weekNumber: string };
};

export type WeekData = {
    weekNumber: number,
    title: string;
    description: string;
    babyDevelopment: string;
    momBody: string;
    feelings: string[];
    comfortTips: string[];
    tasks: string[];
};

export type JourneyClientProps = {
  initialWeek: number;
};

