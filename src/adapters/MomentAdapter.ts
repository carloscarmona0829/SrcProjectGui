import moment, { Moment } from 'moment';

export default moment;
export type { Moment };

export const formatDate = (date: Date | string, format: string = 'YYYY-MM-DD'): string => {
  return moment(date).format(format);
};

export const parseDate = (dateString: string, format: string = 'YYYY-MM-DD'): Date => {
  return moment(dateString, format).toDate();
};

export const isBefore = (date1: Date | string, date2: Date | string): boolean => {
  return moment(date1).isBefore(moment(date2));
};

export const isAfter = (date1: Date | string, date2: Date | string): boolean => {
  return moment(date1).isAfter(moment(date2));
};

export const isSameOrBefore = (date1: Date | string, date2: Date | string): boolean => {
  return moment(date1).isSameOrBefore(moment(date2));
};
