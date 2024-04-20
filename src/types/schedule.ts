export type ScheduleItem = {
  name: string;
  episode: string | number;
  id: number;
};

export type FormattedSchedule = Record<string, ScheduleItem[]>;
