/* eslint-disable react/jsx-no-bind */
import { FC, useState } from 'react';
import moment from 'moment';
import Select, { SingleValue } from 'react-select';
import useCalendar from 'hooks/useCalendar';
import DatePicker from 'components/UI/DatePicker/DatePicker';
import Week from './Week/Week';
import Month from './Month/Month';
import Day from './Day/Day';
import styles from './CalendarPage.module.scss';

type ViewModeType = 'month' | 'week' | 'day';

const CalendarPage: FC = () => {
  const {
    getMonthByDay, getNextMonth, getPrevMonth, today,
  } = useCalendar();
  const [selectedDate, setSelectedDate] = useState<moment.Moment>(useCalendar().today);

  const [viewMode, setViewMode] = useState<ViewModeType>('week');
  const selecOptions = [
    { value: 'month', label: 'Month' },
    { value: 'week', label: 'Week' },
    { value: 'day', label: 'Day' },
  ];

  const handleSetViewMode = (newValue: SingleValue<{ value: string, label: string }>) => {
    if (newValue !== null) setViewMode(newValue.value as ViewModeType);
  };

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <DatePicker
          setSelectedDate={setSelectedDate}
          selectedDate={selectedDate}
          getPrevMonthProp={getPrevMonth}
          getNextMonthProp={getNextMonth}
          getMonthByDayProp={getMonthByDay}
          todayProp={today}
        />
        <Select
          isSearchable={false}
          defaultValue={{ value: 'week', label: 'Week' }}
          options={selecOptions}
          onChange={handleSetViewMode}
        />
      </div>
      {viewMode === 'day' && <Day selectedDate={selectedDate} />}
      {viewMode === 'week' && <Week selectedDate={selectedDate} />}
      {viewMode === 'month' && (
        <Month
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          getMonthByDay={getMonthByDay}
          getPrevMonth={getPrevMonth}
          getNextMonth={getNextMonth}
          today={today}
        />
      )}
    </div>
  );
};

export default CalendarPage;
