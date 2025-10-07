import React, { useState, useEffect } from "react";
import AdministrationPanel from "@components/AdministrationNavbar/AdministrationPanel";
import BigCalendar from "@components/AdministrationNavbar/BigCalendar";
import { FormProvider, useFormContext } from "../../contexts/FormContext"; 


// Event Interface
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

const AdministrationInner: React.FC = () => {
  const { formState } = useFormContext();
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  // Erzeugt ein Event aus formState, falls Datum/Start/End gesetzt sind
  useEffect(() => {
    if (!formState.studienGruppe || !formState.modul) return;

    const existingIndex = events.findIndex(
      (ev) =>
        ev.start.getTime() === (formState as any).startTime?.getTime() &&
        ev.end.getTime() === (formState as any).endTime?.getTime() &&
        ev.studiengruppe === formState.studienGruppe
    );

    const newEvent: Event = {
      title: `${formState.modul} (${formState.studienGruppe})`,
      start: (formState as any).startTime || new Date(),
      end: (formState as any).endTime || new Date(),
      studiengruppe: formState.studienGruppe || "",
      modul: formState.modul || "",
      raum: formState.raum || "",
      typ: formState.veranstaltungstyp || "",
      dozent: formState.dozent || "",
      kommentar: formState.kommentar || "",
    };

    if (existingIndex >= 0) {
      // Event aktualisieren
      const updated = [...events];
      updated[existingIndex] = newEvent;
      setEvents(updated);
    } else {
      // Neues Event hinzufügen
      setEvents((prev) => [...prev, newEvent]);
    }
  }, [
    formState.studienGruppe,
    formState.modul,
    formState.raum,
    formState.veranstaltungstyp,
    formState.dozent,
    formState.kommentar,
    (formState as any).startTime,
    (formState as any).endTime,
  ]);

  return (
    <div style={{ display: "flex", gap: 16, padding: 16 }}>
      <AdministrationPanel
        events={events}
        setEvents={setEvents}
        selectedEvent={selectedEvent}
        setSelectedEvent={setSelectedEvent}
      />
      <div style={{ flex: 1 }}>
        <BigCalendar events={events} onSelectEvent={setSelectedEvent} />
      </div>
    </div>
  );
};

const Administration: React.FC = () => {
  return (
    <FormProvider>
      <AdministrationInner />
    </FormProvider>
  );
};

export default Administration;




