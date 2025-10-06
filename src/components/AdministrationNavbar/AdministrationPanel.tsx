import { useState, useEffect } from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
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
}: AdministrationPanelProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
  const [currentEventIndex, setCurrentEventIndex] = useState<number | null>(
    null
  );

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
  if (!selectedDate) return;

  const index = events.findIndex(
    (ev) => ev.start.toDateString() === selectedDate.toDateString()
  );

  if (index >= 0) {
    setEventExists(true);
    setCurrentEventIndex(index);

    const ev = events[index];

    // Nur setzen, wenn das Feld noch leer ist
    if (!modul) setModul(ev.title.split(" (")[0] || "");
    if (!startTime) setStartTime(ev.start);
    if (!endTime) setEndTime(ev.end);
  } else {
    setEventExists(false);
    setCurrentEventIndex(null);

    // Nur beim ersten Mal zurücksetzen, nicht jedes Mal
    if (!eventExists) {
      setModul("");
      setKommentar("");
    }
  }
}, [selectedDate, events]);

  const handleAdd = () => {
    if (!selectedDate || !startTime || !endTime) return;

    const start = new Date(selectedDate);
    start.setHours(startTime.getHours(), startTime.getMinutes());
    const end = new Date(selectedDate);
    end.setHours(endTime.getHours(), endTime.getMinutes());

    const newEvent: Event = {
      title: `${modul} (${studiengruppe})`,  start,  end,  studiengruppe,  modul,  raum,  typ,  dozent,  kommentar,
    };
    setEvents([...events, newEvent]);
  };

  const handleUpdate = () => {
    if (currentEventIndex === null || !selectedDate || !startTime || !endTime)
      return;

    const start = new Date(selectedDate);
    start.setHours(startTime.getHours(), startTime.getMinutes());
    const end = new Date(selectedDate);
    end.setHours(endTime.getHours(), endTime.getMinutes());

    const updatedEvents = [...events];
    updatedEvents[currentEventIndex] = {
      title: `${modul} (${studiengruppe})`,  start,  end,  studiengruppe,  modul,  raum,  typ,  dozent,  kommentar,
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
        width: { xs: "100%", sm: 380, md: 420 },
        minWidth: { xs: "100%", sm: 300 },
        bgcolor: "#E3F2FD",
        height: { xs: "auto", sm: "100vh" },
        display: "flex",
        flexDirection: "column",
        borderRight: { xs: "none", sm: "1px solid #d0d7dd" },
        p: 2,
        boxSizing: "border-box",
        overflowY: "auto",
      }}
    >
      {/* Mini-Kalender */}
      <CalendarMini date={selectedDate} onChange={setSelectedDate} />

      {/* Trennlinie */}
      <Box
        sx={{
          mx: -2,
          width: "calc(100% + 32px)",
          borderBottom: "2px solid #0A2E65",
          my: 2,
          opacity: 0.95,
        }}
      />

      {/* Header */}
      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "flex-start" : "center",
          justifyContent: "space-between",
          gap: 2,
          mt: -2,
        }}
      >
        <Typography
          sx={{
            fontWeight: 800,
            fontSize: { xs: "1.1rem", sm: "1.3rem" },
            color: "#0d0d0d",
            lineHeight: 3.1,
          }}
        >
          Verwaltung
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 1,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Box
             sx={{
               bgcolor: "#fff",
               px: 1.4,
               py: 0.6,
               borderRadius: 10,
               fontSize: 13,
               fontFamily: "Inter, Roboto, sans-serif",
               fontWeight: 600,
               color: "#0A2E65", 
               boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
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
               px: 1.4,
               py: 0.6,
               borderRadius: 10,
               fontSize: 13,
               fontFamily: "Inter, Roboto, sans-serif",
               fontWeight: 600,
               color: "#0A2E65",
               boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
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
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 1,
            mt: 1,
          }}
        >
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




