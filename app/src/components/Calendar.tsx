import React from 'react'
import FullCalendar, { EventInput } from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import moment from 'moment'

import { ScheduleSection } from '../lib/types'

const days: { [key: string]: number } = {
  M: 1,
  T: 2,
  W: 3,
  R: 4,
  F: 5,
}

const colors: string[] = ['#FF0000', '#20BF55', '#CC14CC', '#FC7753', '#1E2EDE', '#009688', '#BDBF09']

const getColor = (index: number): string => {
  return colors[colors.length % index]
}

interface CalendarProps {
  schedule: ScheduleSection[]
}

const Calendar: React.FC<CalendarProps> = ({ schedule }) => {
  const events: EventInput[] = []
  const base = moment().startOf('week')

  schedule.forEach((course, index) => {
    const [start, end] = course.period.split(' - ').map((time) => moment(time, 'LT'))
    const color = getColor(index)

    course.days.split('').forEach((day) => {
      events.push({
        title: course.name,
        start: base.clone().add(days[day], 'days').set({ hour: start.hour(), minute: start.minute() }).toDate(),
        end: base.clone().add(days[day], 'days').set({ hour: end.hour(), minute: end.minute() }).toDate(),
        backgroundColor: color,
        borderColor: color,
        textColor: '#333',
      })
    })
  })

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
