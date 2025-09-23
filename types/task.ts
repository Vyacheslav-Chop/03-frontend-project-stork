export interface Task {
  _id: string;
  name: string;
  isDone: boolean;
  date: string;
}

export interface TasksReminderCardProps {
  className?: string;
}
