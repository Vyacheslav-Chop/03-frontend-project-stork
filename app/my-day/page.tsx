import GreetingBlock from '@/components/GreetingBlock/GreetingBlock';
import StatusBlock from '@/components/StatusBlock/StatusBlock';
import css from '../page.module.css';
import BabyTodayCard from '@/components/BabyTodayCard/BabyTodayCard';
import MomTipCard from '@/components/MomTipCard/MomTipCard';
import TasksReminderCard from '@/components/TasksReminderCard/TasksReminderCard';
import FeelingCheckCard from '@/components/FeelingCheckCard/FeelingCheckCard';

const MyDayPage = () => {
  return (
    <div className={css.mainWrapper}>
      <GreetingBlock />
      <div>
        <div>
          <StatusBlock weekNumber={16} daysToBirth={163} />
          <BabyTodayCard />
          <MomTipCard />
        </div>
        <div>
          <TasksReminderCard />
          <FeelingCheckCard />
        </div>
      </div>
    </div>
  );
};
export default MyDayPage;
