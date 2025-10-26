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
  selectedTimeSlot: { start: Date; end: Date } | null;
}

export default function AdministrationPanel({ events, setEvents, selectedEvent, selectedTimeSlot }: AdministrationPanelProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [startTime, setStartTime] = useState<Date | null>(new Date());
  const [endTime, setEndTime] = useState<Date | null>(new Date(new Date().getTime() + 60 * 60 * 1000));
  const [typ, setTyp] = useState("");
  const [kommentar, setKommentar] = useState("");
  const [eventExists, setEventExists] = useState(false);
  const [currentEventIndex, setCurrentEventIndex] = useState<number | null>(null);
  const { validateForm, formState } = useFormContext();
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
      setTyp(selectedEvent.typ || "");
      setKommentar(selectedEvent.kommentar || "");
      setEventExists(true);
      const idx = events.findIndex(ev => ev === selectedEvent);
      setCurrentEventIndex(idx >= 0 ? idx : null);
    }
  }, [selectedEvent]);

  // Wenn ein Zeitslot durch Drag ausgewählt wurde, Start- und Endzeit aktualisieren
  useEffect(() => {
    if (selectedTimeSlot) {
      setStartTime(selectedTimeSlot.start);
      setEndTime(selectedTimeSlot.end);
      setSelectedDate(selectedTimeSlot.start);
    }
  }, [selectedTimeSlot]);

  useEffect(() => {
    if (!selectedDate) {
      setEventExists(false);
      setCurrentEventIndex(null);
      return;
    }

    const index = events.findIndex(
      (ev) =>
        ev.start.toDateString() === selectedDate.toDateString()

    );

    if (index >= 0) {
      setEventExists(true);
      setCurrentEventIndex(index);

      const ev = events[index];
      // Start- und Endzeit setzen
      setStartTime(ev.start);
      setEndTime(ev.end);
      // Modul aus Titel extrahieren (optional)

    } else {
      setEventExists(false);
      setCurrentEventIndex(null);
      // Formular leeren
      setKommentar("");
      // Zeiten nicht zurücksetzen, wenn sie durch einen Zeitslot-Drag gesetzt wurden
      // Die Zeiten bleiben erhalten, wenn der Benutzer einen Zeitslot ausgewählt hat
    }
  }, [selectedDate,  events]);

  const handleAdd = () => {
    if (!selectedDate || !startTime || !endTime) return;

      // Aktuelle Werte ausgeben
      console.log('Studiengruppe:', formState.studienGruppe);
      console.log('Modul:', formState.modul);
      console.log('Dozent:', formState.dozent);
      console.log('Veranstaltungstyp:', formState.veranstaltungstyp);
      console.log('Raum:', formState.raum);

      const validation = validateForm();

      if (validation.isValid) {
        // alert('Alle Felder sind ausgefüllt! Die Veranstaltung kann gebucht werden.');
        // Hier können Sie weitere Aktionen ausführen, z.B. API-Call
      } else {
        alert(`Bitte füllen Sie folgende Felder aus: ${validation.missingFields.join(', ')}`);
      }
    console.log(selectedDate, startTime, endTime);
    const start = new Date(selectedDate);
    start.setHours(startTime.getHours(), startTime.getMinutes());
    const end = new Date(selectedDate);
    end.setHours(endTime.getHours(), endTime.getMinutes());

    const newEvent: Event = {
      title: `${formState.modul?.name} (${formState.studienGruppe})`,
      start,
      end,
      studiengruppenName: formState.studienGruppe|| "",
      modulName: formState.modul?.name || "",
      modulId: formState.modul?.id || "",
      raumName: formState.raum?.name || "",
      raumId: formState.raum?.id || "",
      typ,
      dozentNamen: formState.dozent?.name || "",
      dozentId: formState.dozent?.id || "",
      kommentar,
    };
     createEvent(newEvent).then((res:any) =>{
       setEvents([...events, res]);
       console.log(res);

    });
  };

  const handleUpdate = () => {
    if (currentEventIndex === null || !selectedDate || !startTime || !endTime) return;

    const start = new Date(selectedDate);
    start.setHours(startTime.getHours(), startTime.getMinutes());
    const end = new Date(selectedDate);
    end.setHours(endTime.getHours(), endTime.getMinutes());

    const updatedEvents = [...events];
    updatedEvents[currentEventIndex] = {
      title: `${formState.modul?.name} (${formState.studienGruppe})`,
      start,
      end,
      studiengruppenName: formState.studienGruppe || "",
      modulName: formState.modul?.name || "",
      modulId: formState.modul?.id || "",
      raumName: formState.raum?.name || "",
      raumId: formState.raum?.id || "",
      typ,
      dozentNamen: formState.dozent?.name || "",
      dozentId: formState.dozent?.id || "",
      kommentar,
    };
    editEvent(updatedEvents[currentEventIndex]).then((res:any) =>{
      updatedEvents[currentEventIndex] = res;
      setEvents(updatedEvents);

  console.log(res)
    });

    console.log(updatedEvents[currentEventIndex]);
  };

  const handleDelete = () => {
    if (currentEventIndex === null) return;
    const filteredEvents = events.filter((_, i) => i !== currentEventIndex);
    setEvents(filteredEvents);
    deleteEvent(events[currentEventIndex]).then(() =>{
      console.log("Event gelöscht");
    });
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
            typ={typ} setTyp={setTyp}
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
    </Box>
  );
}





