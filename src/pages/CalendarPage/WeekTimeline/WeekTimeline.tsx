// Required to set styles for points
/* eslint-disable no-param-reassign */

import moment from 'moment';
import {
  FC, WheelEvent, useRef, useEffect,
} from 'react';
import useCalendar from 'hooks/useCalendar';
import { Booking, Room } from 'types/dataTypes';
import TimelinePoint from '../TimelinePoint/TimelinePoint';

import styles from '../CalendarPage.module.scss';

interface FetchBooking {
  rooms: Room[]
}

const fetchingBooking: FetchBooking = {
  rooms: [
    {
      id: 1,
      name: 'Nest26',
      floor: 2,
      devices: [
        'White board',
      ],
      maxPeople: 5,
      minPeople: 2,
      soonestBookings: [
        {
          id: 3,
          createdAt: '2022-10-29T16:21:58.000Z',
          meetingDate: '2022-11-02',
          startTime: '08:00:00',
          endTime: '09:00:00',
        },
        {
          id: 4,
          createdAt: '2022-10-30T16:21:58.000Z',
          meetingDate: '2022-11-03',
          startTime: '11:00:00',
          endTime: '12:00:00',
        },
        {
          id: '6b4ad80c-fade-4741-b0ef-2f0f0f457674',
          generatedFromRecurrentBookingWithId: 3,
          createdAt: '2022-10-28T16:21:58.000Z',
          meetingDate: '2022-11-04',
          startTime: '10:00:00',
          endTime: '12:00:00',
        },
        {
          id: '15206b7c-7cdc-4e5a-b0bb-4778fb76b487',
          generatedFromRecurrentBookingWithId: 6,
          createdAt: '2022-10-28T16:21:58.000Z',
          meetingDate: '2022-11-04',
          startTime: '10:00:00',
          endTime: '11:30:00',
        },
        {
          id: '6b4ad80c-fade-4741-b0ef-2f0f0f457670',
          generatedFromRecurrentBookingWithId: 3,
          createdAt: '2022-10-28T16:21:58.000Z',
          meetingDate: '2022-11-04',
          startTime: '10:00:00',
          endTime: '14:00:00',
        },
        {
          id: 6,
          createdAt: '2022-11-01T16:21:58.000Z',
          meetingDate: '2022-11-04',
          startTime: '16:00:00',
          endTime: '17:00:00',
        },
        {
          id: '20b9cdb4-116a-4374-b508-a44e2b5fde74',
          generatedFromRecurrentBookingWithId: 3,
          createdAt: '2022-10-28T16:21:58.000Z',
          meetingDate: '2022-11-08',
          startTime: '10:00:00',
          endTime: '12:00:00',
        },
        {
          id: '1c99bf76-ec8d-4b8a-92cc-6b74beed367c',
          generatedFromRecurrentBookingWithId: 6,
          createdAt: '2022-10-28T16:21:58.000Z',
          meetingDate: '2022-11-08',
          startTime: '10:00:00',
          endTime: '12:00:00',
        },
        {
          id: '29e87f9e-51c0-46c8-bb4e-038409100b95',
          generatedFromRecurrentBookingWithId: 3,
          createdAt: '2022-10-28T16:21:58.000Z',
          meetingDate: '2022-11-11',
          startTime: '10:00:00',
          endTime: '12:00:00',
        },
        {
          id: '9196d74a-e8cc-4078-848d-41c9e73377bc',
          generatedFromRecurrentBookingWithId: 6,
          createdAt: '2022-10-28T16:21:58.000Z',
          meetingDate: '2022-11-11',
          startTime: '10:00:00',
          endTime: '12:00:00',
        },
        {
          id: 1,
          createdAt: '2022-10-28T16:21:58.000Z',
          meetingDate: '2022-11-13',
          startTime: '18:30:00',
          endTime: '19:00:00',
        },
        {
          id: '39e20467-1f77-4b42-b235-132765b1e4a2',
          generatedFromRecurrentBookingWithId: 3,
          createdAt: '2022-10-28T16:21:58.000Z',
          meetingDate: '2022-11-15',
          startTime: '10:00:00',
          endTime: '12:00:00',
        },
        {
          id: '2d8345dd-465d-4858-832e-136efe8f5610',
          generatedFromRecurrentBookingWithId: 6,
          createdAt: '2022-10-28T16:21:58.000Z',
          meetingDate: '2022-11-15',
          startTime: '10:00:00',
          endTime: '12:00:00',
        },
        {
          id: '7954b5fc-4126-4f01-a046-73ebc735e354',
          generatedFromRecurrentBookingWithId: 3,
          createdAt: '2022-10-28T16:21:58.000Z',
          meetingDate: '2022-11-18',
          startTime: '10:00:00',
          endTime: '12:00:00',
        },
        {
          id: 'cb2d5eb1-042c-49be-9d01-d21ff3c66901',
          generatedFromRecurrentBookingWithId: 6,
          createdAt: '2022-10-28T16:21:58.000Z',
          meetingDate: '2022-11-18',
          startTime: '10:00:00',
          endTime: '12:00:00',
        },
        {
          id: 'b943b0cc-3ab1-4d69-8c30-a26d3999d795',
          generatedFromRecurrentBookingWithId: 3,
          createdAt: '2022-10-28T16:21:58.000Z',
          meetingDate: '2022-11-22',
          startTime: '10:00:00',
          endTime: '12:00:00',
        },
        {
          id: 'ac567f96-d977-466d-8ef3-4b8452a79d0d',
          generatedFromRecurrentBookingWithId: 6,
          createdAt: '2022-10-28T16:21:58.000Z',
          meetingDate: '2022-11-22',
          startTime: '10:00:00',
          endTime: '12:00:00',
        },
      ],
    },
    {
      id: 2,
      name: 'MainNest',
      floor: 2,
      devices: [
        'White board',
        'Big screen',
        'Water cooler',
        'PlayStation',
        'Air conditioner',
        'Sound system',
        'Tennis table',
      ],
      maxPeople: 15,
      minPeople: 2,
      soonestBookings: [
        {
          id: '15f4611b-613e-4133-8314-dba7ddbac615',
          generatedFromRecurrentBookingWithId: 2,
          createdAt: '2022-10-28T16:21:58.000Z',
          meetingDate: '2022-11-02',
          startTime: '17:00:00',
          endTime: '18:00:00',
        },
        {
          id: '1f23bad1-329c-4f84-8b3c-6b4120c2c64a',
          generatedFromRecurrentBookingWithId: 5,
          createdAt: '2022-10-28T16:21:58.000Z',
          meetingDate: '2022-11-02',
          startTime: '17:00:00',
          endTime: '18:00:00',
        },
        {
          id: 7,
          createdAt: '2022-11-02T16:21:58.000Z',
          meetingDate: '2022-11-05',
          startTime: '09:00:00',
          endTime: '10:00:00',
        },
        {
          id: 8,
          createdAt: '2022-11-03T16:21:58.000Z',
          meetingDate: '2022-11-05',
          startTime: '10:00:00',
          endTime: '11:00:00',
        },
        {
          id: 'd0998d35-9ecb-4517-bd93-898af9ec15d7',
          generatedFromRecurrentBookingWithId: 2,
          createdAt: '2022-10-28T16:21:58.000Z',
          meetingDate: '2022-11-09',
          startTime: '17:00:00',
          endTime: '18:00:00',
        },
        {
          id: '573be2ee-03f0-4921-923c-e6a99725d81c',
          generatedFromRecurrentBookingWithId: 5,
          createdAt: '2022-10-28T16:21:58.000Z',
          meetingDate: '2022-11-09',
          startTime: '17:00:00',
          endTime: '18:00:00',
        },
      ],
    },
    {
      id: 5,
      name: 'React13',
      floor: 2,
      devices: [
        'White board',
        'Big screen',
        'Water cooler',
        'Tennis table',
      ],
      maxPeople: 5,
      minPeople: 2,
      soonestBookings: [],
    },
    {
      id: 6,
      name: 'SQL26',
      floor: 2,
      devices: [
        'White board',
        'Big screen',
        'Water cooler',
        'PlayStation',
        'Air conditioner',
        'Sound system',
        'Tennis table',
      ],
      maxPeople: 5,
      minPeople: 2,
      soonestBookings: [],
    },
    {
      id: 4,
      name: 'React26',
      floor: 3,
      devices: [
        'White board',
        'Big screen',
        'Water cooler',
        'Air conditioner',
      ],
      maxPeople: 5,
      minPeople: 2,
      soonestBookings: [],
    },
    {
      id: 3,
      name: 'Nest13',
      floor: 3,
      devices: [
        'White board',
        'Big screen',
        'Water cooler',
        'PlayStation',
        'Air conditioner',
        'Sound system',
        'Tennis table',
      ],
      maxPeople: 5,
      minPeople: 2,
      soonestBookings: [
        {
          id: 2,
          createdAt: '2022-10-28T16:21:58.000Z',
          meetingDate: '2022-11-17',
          startTime: '09:00:00',
          endTime: '10:00:00',
        },
      ],
    },
  ],
};

interface WeekTimelineProps {
  selectedDate: moment.Moment
}

const WeekTimeline: FC<WeekTimelineProps> = ({ selectedDate }) => {
  const mondayRef = useRef<HTMLDivElement>(null);
  const tuesdayRef = useRef<HTMLDivElement>(null);
  const wednesdayRef = useRef<HTMLDivElement>(null);
  const thursdayRef = useRef<HTMLDivElement>(null);
  const fridayRef = useRef<HTMLDivElement>(null);
  const saturdayRef = useRef<HTMLDivElement>(null);
  const sundayRef = useRef<HTMLDivElement>(null);

  const weekRef = useRef<HTMLDivElement>(null);
  const hours = Array.from(Array(24).keys());
  const { getWeekByDay } = useCalendar();

  const horizontalScroll = (e: WheelEvent<HTMLDivElement>) => {
    if (weekRef.current === null) return;

    if (e.deltaY > 0) {
      weekRef.current.scrollLeft += 100;
    } else {
      weekRef.current.scrollLeft -= 100;
    }
  };

  const renderPoint = (weekDay: number, room: number): React.ReactNode => {
    const bookingDuringTheDay: Booking[] = [];
    const { soonestBookings, ...roomProp } = fetchingBooking.rooms[room];

    soonestBookings.forEach((bookingDay) => {
      if (getWeekByDay(selectedDate)[weekDay].format('DDD') === moment(bookingDay.meetingDate).format('DDD')) {
        bookingDuringTheDay.push(bookingDay);
      }
    });

    return bookingDuringTheDay.map((booking) => (
      <TimelinePoint key={booking.id} room={roomProp} bookingDate={booking} />
    ));
  };

  const checkPosition = (ref: HTMLDivElement | null) => {
    const checkedBookings: number[] = [];
    let bookingsOnDay: NodeListOf<HTMLDivElement> | null = null;

    if (ref === null) return;

    bookingsOnDay = ref.querySelectorAll('.bokingLine');

    bookingsOnDay.forEach((checkableBooking, ind) => {
      const bookings: HTMLDivElement[] = [];

      if (checkedBookings.includes(ind)) return;
      if (bookingsOnDay === null) return;

      bookingsOnDay.forEach((booking, index) => {
        if (
          Math.max(
            checkableBooking.getBoundingClientRect().x,
            booking.getBoundingClientRect().x,
          )
          <= Math.min(
            checkableBooking.getBoundingClientRect().x
            + checkableBooking.getBoundingClientRect().width,
            booking.getBoundingClientRect().x + booking.getBoundingClientRect().width,
          )
        ) {
          checkedBookings.push(index);
          bookings.push(booking);
        }
      });

      if (bookings.length <= 1) return;

      bookings.forEach((item, i) => {
        const oneBookingHeght = 100 / bookings.length;

        if (i === 0) {
          item.style.top = '3px';
        } else item.style.top = `calc(${oneBookingHeght * i}% + 2px)`;

        item.style.height = `calc(${oneBookingHeght}% - 4px)`;
      });
    });
  };

  useEffect(() => {
    checkPosition(mondayRef.current);
    checkPosition(tuesdayRef.current);
    checkPosition(wednesdayRef.current);
    checkPosition(thursdayRef.current);
    checkPosition(fridayRef.current);
    checkPosition(saturdayRef.current);
    checkPosition(sundayRef.current);
  }, [selectedDate]);

  return (
    <>
      <div className={styles.days}>
        {getWeekByDay(selectedDate).map((day) => (
          <div
            key={day.format('DDD')}
            className={styles.day}
          >
            <div className={styles.weekDayName}>{moment.weekdaysShort(day.day())}</div>
            <div className={styles.dayNumOfMonth}>{day.date()}</div>
          </div>
        ))}
      </div>
      <div ref={weekRef} className={styles.calendar} onWheel={horizontalScroll}>
        <div className={styles.timeline}>
          <div className={styles.timelineRow}>
            {hours.map((hour) => (
              <div
                key={hour}
                className={styles.hour}
              >
                {`${hour} : 00`}
              </div>
            ))}
          </div>
          <div className={styles.dayRows}>
            <div ref={mondayRef} className={styles.dayRow}>
              {renderPoint(0, 0)}
            </div>
            <div ref={tuesdayRef} className={styles.dayRow}>
              {renderPoint(1, 0)}
            </div>
            <div ref={wednesdayRef} className={styles.dayRow}>
              {renderPoint(2, 0)}
            </div>
            <div ref={thursdayRef} className={styles.dayRow}>
              {renderPoint(3, 0)}
            </div>
            <div ref={fridayRef} className={styles.dayRow}>
              {renderPoint(4, 0)}
            </div>
            <div ref={saturdayRef} className={styles.dayRow}>
              {renderPoint(5, 0)}
            </div>
            <div ref={sundayRef} className={styles.dayRow}>
              {renderPoint(6, 0)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WeekTimeline;
