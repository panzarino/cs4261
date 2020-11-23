import React from 'react'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import moment from 'moment'
import randomColor from 'random-color'

import { ScheduleSection } from '../lib/types'

const days: { [key: string]: number } = {
  M: 0,
  T: 1,
  W: 2,
  R: 3,
  F: 4,
}

interface CalendarProps {
  schedule: ScheduleSection[]
}

const Calendar: React.FC<CalendarProps> = ({ schedule }) => {
  const events = []
  const base = moment().startOf('week')

  for (const course of schedule) {
    const [start, end] = course.period.split(' - ').map((time) => moment(time, 'LT'))
    const color = randomColor().hexString()

    for (const day of course.days) {
      events.push({
        title: course.name,
        start: base.clone().add(days[day], 'days').set({ hour: start.hour(), minute: start.minute() }).toDate(),
        end: base.clone().add(days[day], 'days').set({ hour: end.hour(), minute: end.minute() }).toDate(),
        backgroundColor: color,
        textColor: '#333',
      })
    }
  }

  return (
    <FullCalendar
      plugins={[timeGridPlugin]}
      initialView="timeGridWeek"
      headerToolbar={{
        start: '',
        center: '',
        end: '',
      }}
      height={500}
      slotMinTime="08:00:00"
      slotMaxTime="22:00:00"
      weekends={false}
      allDaySlot={false}
      dayHeaderFormat={{ weekday: 'short' }}
      events={events}
    />
  )
}

export default Calendar
