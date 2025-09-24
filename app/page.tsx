import css from './page.module.css';
import GreetingBlock from '@/components/GreetingBlock/GreetingBlock';
import StatusBlock from '@/components/StatusBlock/StatusBlock';
import BabyTodayCard from '@/components/BabyTodayCard/BabyTodayCard';
import MomTipCard from '@/components/MomTipCard/MomTipCard';
import TasksReminderCard from '@/components/TasksReminderCard/TasksReminderCard';
import FeelingCheckCard from '@/components/FeelingCheckCard/FeelingCheckCard';
import { fetchBabyData, fetchTasks } from '@/lib/api/apiServer';
import { BabyWeekData } from '@/types/babyWeekData';


export default async function Page() {
  const currentWeek = 14;
  const babyData: BabyWeekData = await fetchBabyData(currentWeek);
  const tasks = await fetchTasks();

  return (
    <div className={css.mainWrapper}>
      <GreetingBlock />
      <div className={css.innerWrapper}>
        <div className={css.firstWrapper}>
          <StatusBlock />
          <BabyTodayCard data={babyData} />
          <MomTipCard data={babyData} />
        </div>
        <div className={css.lastWrapper}>
          <TasksReminderCard data={tasks} />
          <FeelingCheckCard />
        </div>
      </div>
    </div>
  );
}
