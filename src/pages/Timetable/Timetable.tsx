// src/pages/Timetable/Timetable.tsx
import React, { useState } from "react";

import AdministrationPanel from "./AdministrationPanel";
import BigCalendar from "./BigCalendar";
import "./Timetable.css";
import { StudienGruppen } from "../../components/autoCompleteDropdown/studienGruppeDropdown";
import { MODULE } from "../../components/autoCompleteDropdown/modulDropdown";
import { DOZENTEN } from "../../components/autoCompleteDropdown/dozentDropdown";
import { TYPEN } from "../../components/autoCompleteDropdown/veranstaltungsTypDropdown";
import { RAEUME } from '../../components/autoCompleteDropdown/raumDropdown'

export interface Event {
  title: string;
  start: Date;
  end: Date;
  studiengruppe: string;
  modul: string;
  raum: string;
  typ: string;
  dozent: string;
  kommentar: string;
}


const Timetable: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([
    {
      title: `${MODULE[2]} (${StudienGruppen[0]})`,
      start: new Date(2025, 9, 2, 10, 0),
      end: new Date(2025, 9, 2, 12, 0),
      studiengruppe: StudienGruppen[0],
      modul: MODULE[2],
      raum: RAEUME[1],
      typ: TYPEN[0],
      dozent: DOZENTEN[0],
      kommentar: "Erste Vorlesung des Semesters"
    },
    {
      title: `${MODULE[0]} (${StudienGruppen[1]})`,
      start: new Date(2025, 9, 3, 14, 0),
      end: new Date(2025, 9, 3, 16, 0),
      studiengruppe: StudienGruppen[1],
      modul: MODULE[0],
      raum: RAEUME[0],
      typ: TYPEN[4],
      dozent: DOZENTEN[1],
      kommentar: "Abschlussklausur"
    },
  ]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<{ start: Date; end: Date } | null>(null);

  const handleSelectEvent = (event: Event) => {
    setSelectedEvent(event);
    setSelectedSlot(null);
  };

  const handleSelectSlot = (slotInfo: { start: Date; end: Date }) => {
    setSelectedSlot(slotInfo);
    setSelectedEvent(null);
  };

  return (
    <div className="timetable-container">
      <div className="timetable-admin-panel">
        <AdministrationPanel 
          events={events} 
          setEvents={setEvents} 
          selectedEvent={selectedEvent} 
          setSelectedEvent={setSelectedEvent}
          selectedSlot={selectedSlot}
          setSelectedSlot={setSelectedSlot}
        />
      </div>
      <div className="timetable-calendar-container">
        <div className="timetable-calendar-wrapper">
          <BigCalendar 
            events={events} 
            onSelectEvent={handleSelectEvent}
            onSelectSlot={handleSelectSlot}
          />
        </div>
      </div>
    </div>
  );
};

export default Timetable;



