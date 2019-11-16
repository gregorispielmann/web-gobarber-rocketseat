import React, { useState, useMemo, useEffect } from 'react';
import {
  format,
  subDays,
  addDays,
  setHours,
  setMinutes,
  setSeconds,
  setMilliseconds,
  isBefore,
  isEqual,
  parseISO,
} from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import { utcToZonedTime } from 'date-fns-tz';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

import { Container, Time } from './styles';
import api from '~/services/api';

export default function Dashboard() {
  const hourRange = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

  const [date, setDate] = useState(new Date());
  const [schedule, setSchedule] = useState([]);

  const dateFormatted = useMemo(
    () => format(date, "d 'de' MMMM", { locale: pt }),
    [date]
  );

  useEffect(() => {
    async function loadSchedule() {
      const res = await api.get('schedule', {
        params: { date },
      });

      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      const data = hourRange.map(hour => {
        const checkDate = setMilliseconds(
          setSeconds(setMinutes(setHours(date, hour), 0), 0),
          0
        );
        const compareDate = utcToZonedTime(checkDate, timezone);

        return {
          time: `${hour}:00h`,
          past: isBefore(compareDate, new Date()),
          appointment: res.data.find(a =>
            isEqual(parseISO(a.date), compareDate)
          ),
        };
      });

      console.log(data);

      setSchedule(data);
    }

    loadSchedule();
  }, [date]);

  const handlePrevDate = () => {
    setDate(subDays(date, 1));
  };

  const handleNextDate = () => {
    setDate(addDays(date, 1));
  };

  return (
    <Container>
      <header>
        <button type="button">
          <MdChevronLeft
            size={36}
            color="#fff"
            onClick={handlePrevDate}
          ></MdChevronLeft>
        </button>
        <strong>{dateFormatted}</strong>
        <button type="button">
          <MdChevronRight
            size={36}
            color="#fff"
            onClick={handleNextDate}
          ></MdChevronRight>
        </button>
      </header>

      <ul>
        {schedule.map(time => (
          <Time key={time.time} past={time.past} available={!time.appointment}>
            <strong>{time.time}</strong>
            <span>
              {time.appointment ? time.appointment.user.name : 'Em aberto'}
            </span>
          </Time>
        ))}
      </ul>
    </Container>
  );
}
