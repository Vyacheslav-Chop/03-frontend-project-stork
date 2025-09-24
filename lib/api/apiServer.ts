
import { cookies } from "next/headers";
import { nextServer } from "./api";
import { WeekData } from "@/types/journey";
import { BabyWeekData } from "@/types/babyWeekData";
import { GetTask } from "@/types/task";

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


export async function fetchBabyData(week: number): Promise<BabyWeekData> {
    const res = await nextServer.get(
        "/weeks/baby-state",
        {
            params: { weekNumber: week },
        }
    );

    return res.data.data[0] as BabyWeekData;
}

export async function fetchTasks(): Promise<GetTask[]> {
    const res = await nextServer.get("/tasks");
    return res.data.data as GetTask[];
}

