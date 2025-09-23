import { BabyWeekData } from "@/types/babyWeekData";
import { GetTask } from "@/types/task";
import { nextServer } from "./api";

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