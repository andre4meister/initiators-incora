/* eslint-disable jsx-a11y/click-events-have-key-events */
import cn from 'classnames';
import moment from 'moment';
import React, { FC } from 'react';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import useCalendar from 'hooks/useCalendar';

import styles from './DataPicker.module.scss';

interface CalendarProps {
  selectedDate: moment.Moment
  setSelectedDate: React.Dispatch<React.SetStateAction<moment.Moment>>
}

const DataPicker: FC<CalendarProps> = ({ selectedDate, setSelectedDate }) => {
  const {
    today,
    getNextMonth,
    getPrevMonth,
    getMonthByDay,
  } = useCalendar();

  const handleChangeNextMonth = (): void => {
    getNextMonth();
  };

  const handleChangePrevMonth = (): void => {
    getPrevMonth();
  };

  const handleSelectDate = (day: moment.Moment) => {
    setSelectedDate(day);
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
          {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((day) => <span key={day}>{day}</span>)}
          {getMonthByDay(today).map((day, ind) => (
            <div
              onClick={() => handleSelectDate(day)}
              role="button"
              tabIndex={ind}
              className={
                cn(
                  styles.day,
                  (day.isBefore(today.endOf('month'), 'month') || day.isAfter(today.startOf('month'), 'month')) && styles.dayGrey,
                  (day.weekday() === 6 || day.weekday() === 5) && styles.dayWeekend,
                  (day.isSame(selectedDate, 'day') && styles.daySelected),
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
};

export default DataPicker;
