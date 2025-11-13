import React, { useState, useEffect } from 'react';
import { Box, Typography, Divider } from '@mui/material';
import CalendarMini from './CalendarMini';
import AdministrationForm from './AdministrationForm';
import ActionButtons from './ActionsButtons';
import type { Event } from './Timetable';
import { TimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { de } from 'date-fns/locale';
import { colors } from '@mui/joy';
import { useTranslation } from 'react-i18next';
import { useFormContext } from '@/contexts/FormContext.tsx';
import { editEvent, createEvent, deleteEvent } from '@/api/createEvent.ts';
import DisplayNextEvents from '@components/visualComponents/displayNextEvents.tsx';
import useUser from '@/hooks/useUser';

interface AdministrationPanelProps {
  events: Event[];
  setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
  selectedEvent: Event | null;
  setSelectedEvent: (event: Event | null) => void;
  selectedTimeSlot: { start: Date; end: Date } | null;
  isTeacher: boolean;
  isAdmin: boolean;
}

export default function AdministrationPanel({
  events,
  setEvents,
  selectedEvent,
  selectedTimeSlot,
  isTeacher,
  isAdmin,
}: AdministrationPanelProps) {
  const user = useUser();
  const token = user.getAccessToken();
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [startTime, setStartTime] = useState<Date | null>(new Date());
  const [endTime, setEndTime] = useState<Date | null>(
    new Date(new Date().getTime() + 60 * 60 * 1000)
  );
  const [typ, setTyp] = useState('');
  const [kommentar, setKommentar] = useState('');
  const [eventExists, setEventExists] = useState(false);
  const [currentEventIndex, setCurrentEventIndex] = useState<number | null>(
    null
  );
  const { validateForm, formState, updateField } = useFormContext();
  //Übersetzungen
  const { t } = useTranslation();
  const starttime = t('pages.administrationpanel.startzeit');
  const endtime = t('pages.administrationpanel.endzeit');

  // Prüfen, ob für das ausgewählte Datum schon ein Event für diese Studiengruppe oder Dozent existiert
  useEffect(() => {
    if (selectedEvent) {
      console.log(selectedEvent)
      setSelectedDate(selectedEvent.start);
      setStartTime(selectedEvent.start);
      setEndTime(selectedEvent.end);
      setTyp(selectedEvent.typ || '');
      setKommentar(selectedEvent.kommentar || '');
      setEventExists(true);
      formState.modul = selectedEvent.modulName;
      formState.studienGruppe = selectedEvent.studiengruppenName;
      formState.raum = {
        name: selectedEvent.raumName,
        id: selectedEvent.raumId,
      };
      formState.dozent = {
        name: selectedEvent.dozentNamen,
        id: selectedEvent.dozentId,
      };
      updateField('veranstaltungstyp', selectedEvent.typ || null);
      updateField('startTime', selectedEvent.start);
      updateField('endTime', selectedEvent.end);
      updateField('kommentar', selectedEvent.kommentar || null);
      const idx = events.findIndex((ev) => ev === selectedEvent);
      setCurrentEventIndex(idx >= 0 ? idx : null);
    }
  }, [selectedEvent]);

  // Wenn ein Zeitslot durch Drag ausgewählt wurde, Start- und Endzeit aktualisieren
  useEffect(() => {
    if (selectedTimeSlot) {
      setStartTime(selectedTimeSlot.start);
      setEndTime(selectedTimeSlot.end);
      setSelectedDate(selectedTimeSlot.start);
      updateField('startTime', selectedTimeSlot.start);
      updateField('endTime', selectedTimeSlot.end);
    }
  }, [selectedTimeSlot]);

  const handleAdd = () => {
    if (!selectedDate || !startTime || !endTime) return;

    const validation = validateForm();

    if (!validation.isValid) {
      // Button sollte disabled sein, aber zur Sicherheit
      return;
    }

    const start = new Date(selectedDate);
    start.setHours(startTime.getHours(), startTime.getMinutes());
    const end = new Date(selectedDate);
    end.setHours(endTime.getHours(), endTime.getMinutes());

    const newEvent: Event = {
      title: `${formState.modul} (${formState.studienGruppe})`,
      start,
      end,
      studiengruppenName: formState.studienGruppe || '',
      modulName: formState.modul || '',
      raumName: formState.raum?.name || '',
      raumId: formState.raum?.id || '',
      typ,
      dozentNamen: formState.dozent?.name || '',
      dozentId: formState.dozent?.id || '',
      kommentar,
    };
    createEvent(newEvent, token).then((res: any) => {
      setEvents([...events, res]);
      console.log(res);
    });
  };

  const handleUpdate = () => {
    if (currentEventIndex === null || !selectedDate || !startTime || !endTime)
      return;

    const start = new Date(selectedDate);
    start.setHours(startTime.getHours(), startTime.getMinutes());
    const end = new Date(selectedDate);
    end.setHours(endTime.getHours(), endTime.getMinutes());

    const updatedEvents = [...events];
    const toUpdate = updatedEvents[currentEventIndex]
    const event:Event =  {
      id: toUpdate.id,
      title: `${formState.modul} (${formState.studienGruppe})`,
      start,
      end,
      studiengruppenName: formState.studienGruppe! ,
      modulName: formState.modul!,
      raumName: formState.raum?.name!,
      raumId: formState.raum?.id!,
      typ,
      dozentNamen: formState.dozent?.name!,
      dozentId: formState.dozent?.id!,
      kommentar: kommentar || toUpdate.kommentar,
    };
    console.log(event)
    editEvent(event, token).then((res: any) => {
      updatedEvents[currentEventIndex] = res;
      setEvents(updatedEvents);

      console.log(res);
    });

    console.log(updatedEvents[currentEventIndex]);
  };

  const handleDelete = () => {
    if (currentEventIndex === null) return;
    const filteredEvents = events.filter((_, i) => i !== currentEventIndex);
    setEvents(filteredEvents);
    deleteEvent(events[currentEventIndex], token).then(() => {
      console.log('Event gelöscht');
    });
    setEventExists(false);
    setCurrentEventIndex(null);
  };

  return (
    <Box
      role="region"
      aria-labelledby="administration-heading"
      sx={{
        width: '100%',
        bgcolor: '#E3F2FD',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRight: '1px solid #d0d7dd',
        p: 2,
        boxSizing: 'border-box',
        overflowY: 'auto',
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

      <Divider
        sx={{
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
        }}
      />

      {/* Verwaltung Titel + Datum/Uhrzeit */}
      <Box
        sx={{
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
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
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
          <Typography
            id="administration-heading"
            variant="h6"
            sx={{ fontWeight: 700 }}
          >
            {t('pages.administrationpanel.title')}
          </Typography>

          {/* Datum + Uhrzeit Anzeige */}
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Box
              sx={{
                bgcolor: '#ffffffff',
                px: 1.2,
                py: 0.6,
                borderRadius: 10,
                fontSize: 12,
              }}
            >
              {selectedDate?.toLocaleDateString('de-DE', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </Box>
            <Box
              sx={{
                bgcolor: '#ffffffff',
                px: 1.2,
                py: 0.6,
                borderRadius: 10,
                fontSize: 12,
              }}
            >
              {selectedDate?.toLocaleTimeString('de-DE', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Box>
          </Box>
        </Box>

        {/* TimePicker für Start- und Endzeit */}
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={de}>
          <Box
            sx={{
              display: 'flex',
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
            }}
          >
            {(isAdmin || isTeacher) && (
              <TimePicker
                disabled={isTeacher && !isAdmin}
                label={starttime}
                value={startTime}
                onChange={(newValue) => {
                  setStartTime(newValue);
                  updateField('startTime', newValue);
                }}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    sx: {
                      bgcolor: '#fff',
                      borderRadius: 1.5,
                      '& .MuiOutlinedInput-root.Mui-focused fieldset': {
                        borderColor: '#FFBF47',
                        borderWidth: 2,
                      },
                    },
                  },
                }}
              />
            )}
            {(isAdmin || isTeacher) && (
              <TimePicker
                disabled={isTeacher && !isAdmin}
                label={endtime}
                value={endTime}
                onChange={(newValue) => {
                  setEndTime(newValue);
                  updateField('endTime', newValue);
                }}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    sx: {
                      bgcolor: '#fff',
                      borderRadius: 1.5,
                      '& .MuiOutlinedInput-root.Mui-focused fieldset': {
                        borderColor: '#FFBF47',
                        borderWidth: 2,
                      },
                    },
                  },
                }}
              />
            )}
          </Box>
        </LocalizationProvider>
      </Box>

      {/* Formular und Buttons - beide innerhalb des FormProvider */}
      <Box
        sx={{
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
        }}
      >
        <AdministrationForm
          typ={typ}
          setTyp={setTyp}
          kommentar={kommentar}
          setKommentar={setKommentar}
          isTeacher={isTeacher}
          isAdmin={isAdmin}
        />
      </Box>

      {/* Buttons */}
      <Box
        aria-label="Veranstaltungsaktionen"
        sx={{
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
        }}
      >
        <ActionButtons
          eventExists={eventExists}
          onAdd={handleAdd}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
          isTeacher={isTeacher}
          isAdmin={isAdmin}
          isFormValid={validateForm().isValid}
        />
      </Box>
      <Box>
        {!isAdmin && !isTeacher && (
          <div style={{ marginTop: 16 }}>
            <DisplayNextEvents events={events} />
          </div>
        )}
      </Box>
    </Box>
  );
}
