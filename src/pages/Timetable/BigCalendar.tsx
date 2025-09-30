// src/pages/Timetable/BigCalendar.tsx
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { de } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";

import type { Event } from "./Timetable";

export const TYP_COLORS: Record<string, string> = {
  'Kurs': '#1976d2',
  'E-Learning': '#388e3c',
  'Klausureinsicht': '#fbc02d',
  'Dekansprechstunde': '#8e24aa',
  'Prüfung': '#d32f2f',
  'Sonstiges': '#616161',
};

const locales = { de };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

interface BigCalendarProps {
  events: Event[];
  onSelectEvent?: (event: Event) => void;
}

export default function BigCalendar({ events, onSelectEvent }: BigCalendarProps) {
  const eventPropGetter = (event: Event) => {
    const color = TYP_COLORS[event.typ] || '#1976d2';
    return {
      style: {
        backgroundColor: color,
        borderRadius: 6,
        color: '#fff',
        border: 'none',
        fontWeight: 600,
      },
    };
  };

  return (
    <div style={{ height: "calc(100vh - 100px)", background: "white", borderRadius: 8, padding: 8 }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "100%" }}
        views={["month", "week", "day"]}
        defaultView="month"
        // culture="de"
        messages={{
          month: "Monat",
          week: "Woche",
          day: "Tag",
          today: "Heute",
          previous: "Zurück",
          next: "Weiter",
        }}
        onSelectEvent={onSelectEvent}
        eventPropGetter={eventPropGetter}
      />
    </div>
  );
}


