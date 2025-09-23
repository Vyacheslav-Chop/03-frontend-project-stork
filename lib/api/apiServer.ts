import axios from "axios";
import { BabyWeekData } from "@/types/babyWeekData";

export async function fetchBabyData(week: number): Promise<BabyWeekData> {
    const res = await axios.get(
        "http://localhost:3000/api/weeks/baby-state",
        {
            params: { weekNumber: week }, // ✅ ключ совпадает
        }
    );

    return res.data.data[0] as BabyWeekData;
}