import moment from 'moment';
import { useEffect, useState } from 'react';

type UseCaledarType = {
  today: moment.Moment,
  getMonthByDay: (selectedDay: moment.Moment | string) => moment.Moment[]
  getPrevMonth: () => moment.Moment[],
  getNextMonth: () => moment.Moment[],
  getWeekByDay: (currentDay: moment.Moment | string) => moment.Moment[],
};

function useCalendar(): UseCaledarType {
  moment.updateLocale('en', { week: { dow: 1 } });

  const [today, setToday] = useState<moment.Moment>(moment());
  const [calendar, setCalendar] = useState<moment.Moment[]>([]);

  const getMonthByDay = (selectedDay: moment.Moment | string): moment.Moment[] => {
    const newCalendar: moment.Moment[] = [];
    const startDay = moment(selectedDay).clone().startOf('month').startOf('week');
    const endDay = startDay.clone().add(41, 'day');

    while (!startDay.isAfter(endDay)) {
      newCalendar.push(startDay.clone());
      startDay.add(1, 'd');
    }

    return newCalendar;
  };

  useEffect(() => {
    setCalendar(() => getMonthByDay(today));
  }, [today]);

  const getPrevMonth = () => {
    setToday((prev) => prev.clone().subtract(1, 'month'));
    return calendar;
  };

  const getNextMonth = () => {
    setToday((prev) => prev.clone().add(1, 'month'));
    return calendar;
  };

  const getWeekByDay = (currentDay: moment.Moment | string) => {
    const dayClone = moment(currentDay).clone();

    return getMonthByDay(dayClone)
      .filter((day) => {
        if (day.isBefore(dayClone.endOf('week'), 'week') || day.isAfter(dayClone.startOf('week'), 'week')) {
          return false;
        }

        return true;
      });
  };

  return {
    today: today.clone(),
    getMonthByDay,
    getPrevMonth,
    getNextMonth,
    getWeekByDay,
  };
}

export default useCalendar;
