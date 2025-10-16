// src/pages/Timetable/BigCalendar.tsx
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { de } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { useState } from "react";
import type { Event } from "./Timetable";
import type { View } from 'react-big-calendar';
import TYP_COLORS from "./typColors";
import CustomToolbar from "./CustomToolbar";

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
  const [view, setView] = useState<View>("month" as View);
  const [date, setDate] = useState<Date>(new Date());
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
    <div style={{ height: "100%", width: "100%", background: "white", borderRadius: 8, padding: 8 }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "100%" }}
        views={["month", "week", "day"]}
        defaultView="month"
        toolbar={true}
        components={{ toolbar: CustomToolbar }}
        view={view}
        date={date}
        onNavigate={(newDate) => {
          setDate(newDate as Date);
        }}
        onView={(nextView) => {
          setView(nextView);
        }}
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


