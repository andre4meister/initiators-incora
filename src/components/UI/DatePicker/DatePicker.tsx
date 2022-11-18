/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import cn from 'classnames';
import moment from 'moment';
import React, { FC } from 'react';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import useCalendar from 'hooks/useCalendar';

import styles from './DatePicker.module.scss';

interface DatePickerProps {
  selectedDate: moment.Moment
  setSelectedDate: React.Dispatch<React.SetStateAction<moment.Moment>>
  getPrevMonthProp?: () => moment.Moment[]
  getNextMonthProp?: () => moment.Moment[]
  getMonthByDayProp?: () => moment.Moment[]
  todayProp?: moment.Moment
}

const DatePicker: FC<DatePickerProps> = ({
  selectedDate,
  setSelectedDate,
  getPrevMonthProp,
  getNextMonthProp,
  getMonthByDayProp,
  todayProp,
}) => {
  const {
    today, getNextMonth, getPrevMonth, getMonthByDay,
  } = useCalendar();
  const todayComponent = todayProp || today;
  const getPrevMonthComponent = getPrevMonthProp || getPrevMonth;
  const getNextMonthComponent = getNextMonthProp || getNextMonth;
  const getMonthByDayComponent = getMonthByDayProp || getMonthByDay;

  const handleChangeNextMonth = (): void => {
    getNextMonthComponent();
  };

  const handleChangePrevMonth = (): void => {
    getPrevMonthComponent();
  };

  const handleSelectDate = (day: moment.Moment) => {
    setSelectedDate(day);
  };

  return (
    <div className={styles.container}>
      <div className={styles.monthAndYear}>
        <div className={cn(styles.monthPanel, todayComponent.isSame(moment(), 'month') && styles.currentMonth)}>
          <ArrowLeftOutlined className={styles.arrows} onClick={handleChangePrevMonth} />
          <span className={styles.monthName}>{todayComponent.format('MMMM')}</span>
          <ArrowRightOutlined className={styles.arrows} onClick={handleChangeNextMonth} />
        </div>
        <div className={styles.yearPanel}>{todayComponent.format('YYYY')}</div>
      </div>

      <div className={styles.daysPanel}>
        <div className={styles.days}>
          {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((day) => <span key={day}>{day}</span>)}
          {getMonthByDayComponent().map((day, ind) => (
            <div
              onClick={() => handleSelectDate(day)}
              role="button"
              tabIndex={ind}
              className={
                cn(
                  styles.day,
                  (day.isBefore(todayComponent.endOf('month'), 'month') || day.isAfter(todayComponent.startOf('month'), 'month')) && styles.dayGrey,
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

export default DatePicker;
