// src/components/AdministrationNavbar/AdministrationPanel.tsx
import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import CalendarMini from "./CalendarMini";
import VerwaltungsForm from "./AdministrationForm";
import ActionButtons from "./ActionsButtons";
import type { Event } from "@pages/Administration/Administration";
import { TimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { de } from "date-fns/locale";

interface AdministrationPanelProps {
  events: Event[];
  setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
  selectedEvent: Event | null;
  setSelectedEvent: (event: Event | null) => void;
}

export default function AdministrationPanel({
  events,
  setEvents,
  selectedEvent,
  setSelectedEvent,
}: AdministrationPanelProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [startTime, setStartTime] = useState<Date | null>(new Date());
  const [endTime, setEndTime] = useState<Date | null>(
    new Date(new Date().getTime() + 60 * 60 * 1000)
  );
  const [studiengruppe, setStudiengruppe] = useState("");
  const [modul, setModul] = useState("");
  const [raum, setRaum] = useState("");
  const [typ, setTyp] = useState("");
  const [dozent, setDozent] = useState("");
  const [kommentar, setKommentar] = useState("");
  const [eventExists, setEventExists] = useState(false);
  const [currentEventIndex, setCurrentEventIndex] = useState<number | null>(null);

  useEffect(() => {
    if (selectedEvent) {
      setSelectedDate(selectedEvent.start);
      setStartTime(selectedEvent.start);
      setEndTime(selectedEvent.end);
      setModul(selectedEvent.modul || "");
      setStudiengruppe(selectedEvent.studiengruppe || "");
      setRaum(selectedEvent.raum || "");
      setTyp(selectedEvent.typ || "");
      setDozent(selectedEvent.dozent || "");
      setKommentar(selectedEvent.kommentar || "");
      setEventExists(true);
      const idx = events.findIndex((ev) => ev === selectedEvent);
      setCurrentEventIndex(idx >= 0 ? idx : null);
    }
  }, [selectedEvent, events]);

  useEffect(() => {
    if (!selectedDate) {
      setEventExists(false);
      setCurrentEventIndex(null);
      return;
    }

    const index = events.findIndex(
      (ev) =>
        ev.start.toDateString() === selectedDate.toDateString() &&
        ((studiengruppe && ev.title.includes(studiengruppe)) ||
          (dozent && ev.title.includes(dozent)))
    );

    if (index >= 0) {
      setEventExists(true);
      setCurrentEventIndex(index);

      const ev = events[index];
      setStartTime(ev.start);
      setEndTime(ev.end);
      setModul(ev.title.split(" (")[0] || "");
    } else {
      setEventExists(false);
      setCurrentEventIndex(null);
      setModul("");
      setKommentar("");
      setStartTime(new Date());
      setEndTime(new Date(new Date().getTime() + 60 * 60 * 1000));
    }
  }, [selectedDate, studiengruppe, dozent, events]);

  const handleAdd = () => {
    if (!selectedDate || !startTime || !endTime) return;

    const start = new Date(selectedDate);
    start.setHours(startTime.getHours(), startTime.getMinutes());
    const end = new Date(selectedDate);
    end.setHours(endTime.getHours(), endTime.getMinutes());

    const newEvent: Event = {
      title: `${modul} (${studiengruppe})`,
      start,
      end,
      studiengruppe,
      modul,
      raum,
      typ,
      dozent,
      kommentar,
    };
    setEvents([...events, newEvent]);
  };

  const handleUpdate = () => {
    if (currentEventIndex === null || !selectedDate || !startTime || !endTime) return;

    const start = new Date(selectedDate);
    start.setHours(startTime.getHours(), startTime.getMinutes());
    const end = new Date(selectedDate);
    end.setHours(endTime.getHours(), endTime.getMinutes());

    const updatedEvents = [...events];
    updatedEvents[currentEventIndex] = {
      title: `${modul} (${studiengruppe})`,
      start,
      end,
      studiengruppe,
      modul,
      raum,
      typ,
      dozent,
      kommentar,
    };
    setEvents(updatedEvents);
  };

  const handleDelete = () => {
    if (currentEventIndex === null) return;
    const filteredEvents = events.filter((_, i) => i !== currentEventIndex);
    setEvents(filteredEvents);
    setEventExists(false);
    setCurrentEventIndex(null);
  };

  return (
    <Box
      sx={{
        width: 420,
        bgcolor: "#E3F2FD",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        borderRight: "1px solid #d0d7dd",
        p: 2,
        boxSizing: "border-box",
        overflowY: "auto",
      }}
    >
      {/* Mini-Kalender */}
      <CalendarMini date={selectedDate} onChange={setSelectedDate} />

      {/* Durchgezogene Trennlinie zwischen Kalender und Verwaltung */}
      <Box
        sx={{
          mx: -2,
          width: "calc(100% + 32px)",
          borderBottom: "2px solid #0A2E65",
          my: 2,
          opacity: 0.95,
        }}
      />

      {/* Header: Verwaltung (links) + Datum & Uhrzeit (rechts) */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
          mt: -2,
        }}
      >
        <Typography
          sx={{
            fontWeight: 800,
            fontSize: "1.3rem",
            color: "#0d0d0d",
            lineHeight: 3.1,
          }}
        >
          Verwaltung
        </Typography>

        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <Box
            sx={{
              bgcolor: "#fff",
              px: 1.2,
              py: 0.5,
              borderRadius: 1.5,
              fontSize: "0.8rem",
              fontWeight: 600,
              color: "#0d0d0d",
              boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
            }}
          >
            {selectedDate
              ? selectedDate.toLocaleDateString("de-DE", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })
              : ""}
          </Box>

          <Box
            sx={{
              bgcolor: "#fff",
              px: 1.2,
              py: 0.5,
              borderRadius: 1.5,
              fontSize: "0.8rem",
              fontWeight: 600,
              color: "#0d0d0d",
              boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
            }}
          >
            {startTime
              ? startTime.toLocaleTimeString("de-DE", {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : ""}
          </Box>
        </Box>
      </Box>

      {/* TimePickers */}
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={de}>
        <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
          <TimePicker
            label="Startzeit"
            value={startTime}
            onChange={setStartTime}
            slotProps={{
              textField: {
                fullWidth: true,
                size: "small",
                sx: { bgcolor: "#fff", borderRadius: 1.5 },
              },
            }}
          />
          <TimePicker
            label="Endzeit"
            value={endTime}
            onChange={setEndTime}
            slotProps={{
              textField: {
                fullWidth: true,
                size: "small",
                sx: { bgcolor: "#fff", borderRadius: 1.5 },
              },
            }}
          />
        </Box>
      </LocalizationProvider>

      {/* Formular */}
      <Box sx={{ mt: 2 }}>
        <VerwaltungsForm
          studiengruppe={studiengruppe}
          setStudiengruppe={setStudiengruppe}
          modul={modul}
          setModul={setModul}
          raum={raum}
          setRaum={setRaum}
          typ={typ}
          setTyp={setTyp}
          dozent={dozent}
          setDozent={setDozent}
          kommentar={kommentar}
          setKommentar={setKommentar}
        />
      </Box>

      {/* Action Buttons */}
      <Box sx={{ mt: 2 }}>
        <ActionButtons
          eventExists={eventExists}
          onAdd={handleAdd}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      </Box>
    </Box>
  );
}





