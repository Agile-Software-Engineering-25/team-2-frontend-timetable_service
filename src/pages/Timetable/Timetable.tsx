// src/pages/Timetable/Timetable.tsx
import React, { useState } from "react";
import AdministrationPanel from "./AdministrationPanel";
import BigCalendar from "./BigCalendar";
import "./Timetable.css";

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
    <div className="timetable-container">
      <div className="timetable-admin-panel">
        <AdministrationPanel events={events} setEvents={setEvents} />
      </div>
      <div className="timetable-calendar-container">
        <div className="timetable-calendar-wrapper">
          <BigCalendar events={events} />
        </div>
      </div>
    </div>
  );
};

export default Timetable;



