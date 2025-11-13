import React, { useState, useEffect } from 'react';
import AdministrationPanel from './AdministrationPanel';
import BigCalendar from './BigCalendar';
import './Timetable.css';
import LanguageSelectorComponent from '../../components/LanguageSelectorComponent/LanguageSelectorComponent';
import { FormProvider } from '@/contexts/FormContext.tsx';
import { getEvent } from '@/api/createEvent.ts';
import useUser from '@/hooks/useUser';

//Konstanten für Ansicht-Steuerung
const isAdmin = true;
const isTeacher = true;

export interface Event {
  id?: string;
  title: string;
  start: Date;
  end: Date;
  studiengruppenName: string;
  modulName: string;
  raumName: string;
  raumId: string;
  typ: string;
  dozentNamen: string;
  dozentId: string;
  kommentar: string;
}

const Timetable: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const user = useUser();
  const token = user.getAccessToken();
  useEffect(() => {
    let ignoreResult = false;
    getEvent(token).then((result) => {
      if (ignoreResult) return;
      setEvents(result);
      console.log(result);
    });
    return () => {
      ignoreResult = true;
    };

  }, [token]);


  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<{
    start: Date;
    end: Date;
  } | null>(null);

  const handleSelectEvent = (event: Event) => {
    console.log(event)
    setSelectedEvent(event);
  };

  const handleSelectSlot = (slotInfo: { start: Date; end: Date }) => {
    setSelectedTimeSlot(slotInfo);
  };
  const srStatus = selectedEvent
    ? `Ausgewählt: ${selectedEvent.modulName} in ${selectedEvent.raumName}, ` +
    `${selectedEvent.start.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })} bis ` +
    `${selectedEvent.end.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })}`
    : '';

  return (
    <div
      className="timetable-container"
      role="main"
      aria-labelledby="timetable-heading"
    >
      <h1
        id="timetable-heading"
        style={{ position: 'absolute', left: '-9999px' }}
      >
        Stundenplan
      </h1>
      <div aria-live="polite" style={{ position: 'absolute', left: '-9999px' }}>
        {srStatus}
      </div>
      <FormProvider>
        <div className="timetable-admin-panel">
          <AdministrationPanel
            events={events}
            setEvents={setEvents}
            selectedEvent={selectedEvent}
            setSelectedEvent={setSelectedEvent}
            selectedTimeSlot={selectedTimeSlot}
            isTeacher={isTeacher}
            isAdmin={isAdmin}
          />
        </div>
      </FormProvider>
      <div className="timetable-calendar-container">
        <div
          className="timetable-calendar-wrapper"
          id="big-calendar-grid"
          aria-label="Kalenderansicht"
          role="region"
        >
          <BigCalendar
            events={events}
            onSelectEvent={handleSelectEvent}
            onSelectSlot={handleSelectSlot}
          />
        </div>
        <div
          className="language-selector-container"
          aria-label="Sprache wählen"
        >
          <LanguageSelectorComponent />
        </div>
      </div>
    </div>
  );
};

export default Timetable;
