import { useState } from "react";
import GreetingBlock from "@/components/GreetingBlock/GreetingBlock";
import WeekSelector from "@/components/WeekSelector/WeekSelector";
import JourneyDetailsClient from "./[weekNumber]/JourneyDetailsClient";
import { JourneyClientProps } from "@/types/journey";
import Loader from "@/components/Loader/Loader";

export default function JourneyClient({ initialWeek }: JourneyClientProps) {
  const [selectedWeek, setSelectedWeek] = useState<number>(initialWeek);


  const [isLoading, setIsLoading] = useState(false);
  return (
    <div>
      <GreetingBlock />
      <WeekSelector
        currentWeek={initialWeek}
        selectedWeek={selectedWeek}
        onSelectWeek={setSelectedWeek}
      />
      {isLoading && <Loader />}
      <JourneyDetailsClient weekNumber={selectedWeek} />
    </div>
  );
}
