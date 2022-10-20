import cn from 'classnames';
import moment from 'moment';
import React, {
  useCallback, useEffect, useState,
} from 'react';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';

import styles from './Calendar.module.scss';

const Calendar: React.FunctionComponent = React.memo(() => {
  moment.updateLocale('en', { week: { dow: 1 } });

  const [today, setToday] = useState<moment.Moment>(moment());
  const [calendar, setCalendar] = useState<moment.Moment[]>([]);

  const getMonth = useCallback((): moment.Moment[] => {
    const newCalendar: moment.Moment[] = [];
    const startDay = today.clone().startOf('month').startOf('week');
    const endDay = startDay.clone().add(41, 'd');

    while (!startDay.isAfter(endDay)) {
      newCalendar.push(startDay.clone());
      startDay.add(1, 'd');
    }

    return newCalendar;
  }, [today]);

  useEffect(() => {
    setCalendar(() => getMonth());
  }, [getMonth]);

  const handleChangeNextMonth = (): void => {
    setToday((prev) => prev.clone().add(1, 'M'));
  };

  const handleChangePrevMonth = (): void => {
    setToday((prev) => prev.clone().subtract(1, 'M'));
  };

  return (
    <div className={styles.container}>
      <div className={styles.monthAndYear}>
        <div className={cn(styles.monthPanel, today.isSame(moment(), 'month') && styles.currentMonth)}>
          <ArrowLeftOutlined className={styles.arrows} onClick={handleChangePrevMonth} />
          <span className={styles.monthName}>{today.format('MMMM')}</span>
          <ArrowRightOutlined className={styles.arrows} onClick={handleChangeNextMonth} />
        </div>
        <div className={styles.yearPanel}>{today.format('YYYY')}</div>
      </div>

      <div className={styles.daysPanel}>
        <div className={styles.days}>
          {/* <div className={styles.weekDays}> */}
          {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((day) => <span key={day}>{day}</span>)}
          {/* </div> */}
          {calendar.map((day) => (
            <div
              className={
                cn(
                  styles.day,
                  (day.isBefore(today.endOf('month'), 'month') || day.isAfter(today.startOf('month'), 'month')) && styles.dayGrey,
                  (day.weekday() === 6 || day.weekday() === 5) && styles.dayWeekend,
                  day.isSame(moment(), 'day') && styles.dayToday,
                )
              }
              key={day.format('DDD')}
            >
              {day.date()}
            </div>
          ))}
        </div>
      </div>
    </div>

  );
});

export default Calendar;
