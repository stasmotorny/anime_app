type StatusTitleType = {
  [key: string]: string;
  FINISHED: string;
  CANCELLED: string;
  HIATUS: string;
  RELEASING: string;
  NOT_YET_RELEASED: string;
};
export const statusTitles: StatusTitleType = {
  FINISHED: 'Finished',
  CANCELLED: 'Canceled',
  HIATUS: 'Paused',
  RELEASING: 'Releasing',
  NOT_YET_RELEASED: 'Not released',
};
