import { useState, useEffect } from "react";
import { Box, Typography, Divider } from "@mui/material";
import CalendarMini from "./CalendarMini";
import AdministrationForm from "./AdministrationForm";
import ActionButtons from "./ActionsButtons";
import type { Event } from "./Timetable";
import { TimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { de } from "date-fns/locale";
import { colors } from "@mui/joy";
import { useTranslation } from 'react-i18next';
import { useFormContext } from '@/contexts/FormContext.tsx';
import { editEvent, createEvent, deleteEvent } from '@/api/createEvent.ts';

interface AdministrationPanelProps {
  events: Event[];
  setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
  selectedEvent: Event | null;
  setSelectedEvent: (event: Event | null) => void;
}

export default function AdministrationPanel({ events, setEvents, selectedEvent }: AdministrationPanelProps) {
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

  //Übersetzungen
  const { t } = useTranslation();
  const starttime = t('pages.administrationpanel.startzeit')
  const endtime = t('pages.administrationpanel.endzeit')

  // Prüfen, ob für das ausgewählte Datum schon ein Event für diese Studiengruppe oder Dozent existiert
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
      const idx = events.findIndex(ev => ev === selectedEvent);
      setCurrentEventIndex(idx >= 0 ? idx : null);
    }
  }, [selectedEvent]);

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
    console.log(selectedDate, startTime, endTime);
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
      role="region"
      aria-labelledby="administration-heading"
      sx={{
        width: "100%",
        bgcolor: "#E3F2FD",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRight: "1px solid #d0d7dd",
        p: 2,
        boxSizing: "border-box",
        overflowY: "auto",
        '@media (max-width: 1200px) and (min-width: 901px)': {
          p: 1.5,
        },
        '@media (max-width: 900px)': {
          overflowY: 'visible',
          height: 'auto',
          p: 1,
        },
        '@media (max-width: 600px)': {
          p: 0.5,
        },
      }}
    >
      {/* Mini-Kalender */}
      <CalendarMini date={selectedDate} onChange={setSelectedDate} />

      <Divider sx={{
        my: 2,
        color: colors.blue[400],
        '@media (max-width: 1200px) and (min-width: 901px)': {
          my: 1.5,
        },
        '@media (max-width: 900px)': {
          my: 1,
        },
        '@media (max-width: 600px)': {
          my: 0.5,
        },
      }} />

      {/* Verwaltung Titel + Datum/Uhrzeit */}
      <Box sx={{
        mb: 1,
        '@media (max-width: 1200px) and (min-width: 901px)': {
          mb: 0.8,
        },
        '@media (max-width: 900px)': {
          mb: 0.5,
        },
        '@media (max-width: 600px)': {
          mb: 0.3,
        },
      }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 1,
            '@media (max-width: 1200px) and (min-width: 901px)': {
              mb: 0.8,
            },
            '@media (max-width: 900px)': {
              mb: 0.5,
            },
            '@media (max-width: 600px)': {
              mb: 0.3,
            },
          }}
        >
          <Typography id="administration-heading" variant="h6" sx={{ fontWeight: 700 }}>
            {t('pages.administrationpanel.title')}
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
            <Box sx={{
              display: "flex",
              gap: 1,
              mt: 1,
              '@media (max-width: 1200px) and (min-width: 901px)': {
                mt: 0.8,
                gap: 0.8,
              },
              '@media (max-width: 900px)': {
                mt: 0.5,
                gap: 0.5,
              },
              '@media (max-width: 600px)': {
                mt: 0.3,
                gap: 0.3,
              },
            }}>
    <TimePicker
      label= {starttime}
      value={startTime}
      onChange={setStartTime}
      slotProps={{
        textField: {
          fullWidth: true,
          sx: {
            bgcolor: "#fff", // weißer Hintergrund
            borderRadius: 1.5,
            "& .MuiOutlinedInput-root.Mui-focused fieldset": {
              borderColor: "#FFBF47", // sichtbarer Fokusrahmen
              borderWidth: 2,
            },
          },
        },
      }}
    />
    <TimePicker
      label={endtime}
      value={endTime}
      onChange={setEndTime}
      slotProps={{
        textField: {
          fullWidth: true,
          sx: {
            bgcolor: "#fff", // weißer Hintergrund
            borderRadius: 1.5,
            "& .MuiOutlinedInput-root.Mui-focused fieldset": {
              borderColor: "#FFBF47", // sichtbarer Fokusrahmen
              borderWidth: 2,
            },
          },
        },
      }}
    />
  </Box>
        </LocalizationProvider>
      </Box>

      {/* Formular und Buttons - beide innerhalb des FormProvider */}
      <FormProvider>
        <Box sx={{
          mt: 2,
          '@media (max-width: 1200px) and (min-width: 901px)': {
            mt: 1.5,
          },
          '@media (max-width: 900px)': {
            mt: 1,
          },
          '@media (max-width: 600px)': {
            mt: 0.5,
          },
        }}>
          <AdministrationForm
            studiengruppe={studiengruppe} setStudiengruppe={setStudiengruppe}
            modul={modul} setModul={setModul}
            raum={raum} setRaum={setRaum}
            typ={typ} setTyp={setTyp}
            dozent={dozent} setDozent={setDozent}
            kommentar={kommentar} setKommentar={setKommentar}
          />
        </Box>

        {/* Buttons */}
        <Box aria-label="Veranstaltungsaktionen" sx={{
          mt: 2,
          '@media (max-width: 1200px) and (min-width: 901px)': {
            mt: 1.5,
          },
          '@media (max-width: 900px)': {
            mt: 1,
          },
          '@media (max-width: 600px)': {
            mt: 0.5,
          },
        }}>
          <ActionButtons
            eventExists={eventExists}
            onAdd={handleAdd}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        </Box>
      </FormProvider>
    </Box>
  );
}





