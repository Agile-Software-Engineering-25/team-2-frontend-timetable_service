// src/pages/Timetable/Timetable.tsx
import React, { useState } from "react";
import AdministrationPanel from "@components/AdministrationNavbar/AdministrationPanel";
import BigCalendar from "@components/AdministrationNavbar/BigCalendar";


export interface Event {
  title: string;
  start: Date;
  end: Date;
}

const Timetable: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([
    { title: "Mathematik Vorlesung", start: new Date(2025, 8, 23, 10, 0), end: new Date(2025, 8, 23, 12, 0) },
    { title: "Klausur ASE", start: new Date(2025, 8, 25, 14, 0), end: new Date(2025, 8, 25, 16, 0) },
  ]);

  return (
    <div style={{ display: "flex", gap: 16, padding: 16 }}>
      <AdministrationPanel events={events} setEvents={setEvents} />
      <div style={{ flex: 1 }}>
        <BigCalendar events={events} />
      </div>
    </div>
  );
};

export default Timetable;



