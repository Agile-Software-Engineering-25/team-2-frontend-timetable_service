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
import LanguageSelectorComponent from "../../components/LanguageSelectorComponent/LanguageSelectorComponent";

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

  const handleSelectEvent = (event: Event) => {
    setSelectedEvent(event);
  };
  const srStatus = selectedEvent
    ? `Ausgewählt: ${selectedEvent.modul} in ${selectedEvent.raum}, ` +
    `${selectedEvent.start.toLocaleTimeString('de-DE',{hour:'2-digit',minute:'2-digit'})} bis ` +
    `${selectedEvent.end.toLocaleTimeString('de-DE',{hour:'2-digit',minute:'2-digit'})}`
    : "";


  return (
      <div className="timetable-container" role="main" aria-labelledby="timetable-heading">
        <h1 id="timetable-heading" style={{ position: 'absolute', left: '-9999px' }}>
          Stundenplan
        </h1>
        <div aria-live="polite" style={{ position: 'absolute', left: '-9999px' }}>
          {srStatus}
        </div>

        <div className="timetable-admin-panel">
          <AdministrationPanel events={events} setEvents={setEvents} selectedEvent={selectedEvent} setSelectedEvent={setSelectedEvent}/>
        </div>
        <div className="timetable-calendar-container">
          <div className="timetable-calendar-wrapper"
               id="big-calendar-grid"
               aria-label="Kalenderansicht"
               role="region"
          >
            <BigCalendar events={events} onSelectEvent={handleSelectEvent} />
          </div>
          <div className="language-selector-container" aria-label="Sprache wählen">
            <LanguageSelectorComponent />
          </div>
        </div>
      </div>
  );
};

export default Timetable;