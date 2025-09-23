import { cookies } from "next/headers";
import { nextServer } from "./api";
import { WeekData } from "@/types/journey";


export async function fetchCurrentWeekServer(): Promise<number> {
  const cookieStore = cookies();
  const res = await nextServer.get<{ weekNumber: number }>("/journey/current", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res.data.weekNumber;
}


export async function fetchWeekDataServer(weekNumber: number): Promise<WeekData> {
  const cookieStore = cookies();
  const res = await nextServer.get<WeekData>(`/journey/${weekNumber}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res.data;
}
