import { FC, useState } from 'react';
import moment from 'moment';
import useCalendar from 'hooks/useCalendar';
import DataPicker from 'components/UI/DataPicker/DataPicker';
import styles from './CalendarPage.module.scss';
import WeekTimeline from './WeekTimeline/WeekTimeline';

const CalendarPage: FC = () => {
  const [selectedDate, setSelectedDate] = useState<moment.Moment>(useCalendar().today);

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <DataPicker setSelectedDate={setSelectedDate} selectedDate={selectedDate} />
      </div>
      <WeekTimeline selectedDate={selectedDate} />
    </div>
  );
};

export default CalendarPage;
