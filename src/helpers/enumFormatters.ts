type StatusTitleType = {
  [key: string]: string;
  FINISHED: string;
  CANCELLED: string;
  HIATUS: string;
  RELEASING: string;
  NOT_YET_RELEASED: string;
};

type mediaSortNames = {
  [key: string]: string;
  SCORE: string;
  SCORE_DESC: string;
  START_DATE: string;
  START_DATE_DESC: string;
  POPULARITY: string;
  POPULARITY_DESC: string;
};
export const statusTitles: StatusTitleType = {
  FINISHED: 'Finished',
  CANCELLED: 'Canceled',
  HIATUS: 'Paused',
  RELEASING: 'Releasing',
  NOT_YET_RELEASED: 'Not released',
};

export const sortTypes: mediaSortNames = {
  SCORE: 'Score',
  SCORE_DESC: 'Score descending',
  START_DATE: 'Old first',
  START_DATE_DESC: 'New first',
  POPULARITY: 'Popularity',
  POPULARITY_DESC: 'Popularity descending',
};
