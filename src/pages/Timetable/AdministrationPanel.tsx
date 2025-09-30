import { useState, useEffect } from "react";
import { Box, Typography, Divider } from "@mui/material";
import CalendarMini from "./CalendarMini";
import VerwaltungsForm from "./AdministrationForm";
import ActionButtons from "./ActionsButtons";
import type { Event } from "./Timetable";
import { TimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { de } from "date-fns/locale";

interface AdministrationPanelProps {
  events: Event[];
  setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
}

export default function AdministrationPanel({ events, setEvents }: AdministrationPanelProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [startTime, setStartTime] = useState<Date | null>(new Date());
  const [endTime, setEndTime] = useState<Date | null>(new Date(new Date().getTime() + 60 * 60 * 1000));
  const [studiengruppe, setStudiengruppe] = useState("");
  const [modul, setModul] = useState("");
  const [raum, setRaum] = useState("");
  const [typ, setTyp] = useState("");
  const [dozent, setDozent] = useState("");
  const [kommentar, setKommentar] = useState("");
  const [eventExists, setEventExists] = useState(false);
  const [currentEventIndex, setCurrentEventIndex] = useState<number | null>(null);

  // Prüfen, ob für das ausgewählte Datum schon ein Event für diese Studiengruppe oder Dozent existiert
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
      // Start- und Endzeit setzen
      setStartTime(ev.start);
      setEndTime(ev.end);
      // Modul aus Titel extrahieren (optional)
      setModul(ev.title.split(" (")[0] || "");
    } else {
      setEventExists(false);
      setCurrentEventIndex(null);
      // Formular leeren
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

      <Divider sx={{ my: 2 }} />

      {/* Verwaltung Titel + Datum/Uhrzeit */}
      <Box sx={{ mb: 1 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 1,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Verwaltung
          </Typography>

          {/* Datum + Uhrzeit Anzeige */}
          <Box sx={{ display: "flex", gap: 1 }}>
            <Box
              sx={{
                bgcolor: "#ffffffff",
                px: 1.2,
                py: 0.6,
                borderRadius: 10,
                fontSize: 12,
              }}
            >
              {selectedDate?.toLocaleDateString("de-DE", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </Box>
            <Box
              sx={{
                bgcolor: "#ffffffff",
                px: 1.2,
                py: 0.6,
                borderRadius: 10,
                fontSize: 12,
              }}
            >
              {selectedDate?.toLocaleTimeString("de-DE", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Box>
          </Box>
        </Box>

        {/* TimePicker für Start- und Endzeit */}
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={de}>
            <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
    <TimePicker
      label="Startzeit"
      value={startTime}
      onChange={setStartTime}
      slotProps={{
        textField: {
          fullWidth: true,
          sx: {
            bgcolor: "#fff", // weißer Hintergrund
            borderRadius: 1.5,
          },
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
          sx: {
            bgcolor: "#fff", // weißer Hintergrund
            borderRadius: 1.5,
          },
        },
      }}
    />
  </Box>
        </LocalizationProvider>
      </Box>

      {/* Formular */}
      <Box sx={{ mt: 2 }}>
        <VerwaltungsForm
          studiengruppe={studiengruppe} setStudiengruppe={setStudiengruppe}
          modul={modul} setModul={setModul}
          raum={raum} setRaum={setRaum}
          typ={typ} setTyp={setTyp}
          dozent={dozent} setDozent={setDozent}
          kommentar={kommentar} setKommentar={setKommentar}
        />
      </Box>

      {/* Buttons */}
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





