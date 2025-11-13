import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { de, enUS } from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { Event } from './Timetable';
import type { View } from 'react-big-calendar';
import type { EventWrapperProps } from 'react-big-calendar';
import { TYP_COLORS, TYP_COLORS_BG } from './typColors';
import CustomToolbar from './CustomToolbar';

const locales = { de, en: enUS };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});
interface AccessibleEventWrapperProps extends EventWrapperProps<Event> {
  children?: React.ReactNode;
}
interface BigCalendarProps {
  events: Event[];
  onSelectEvent?: (event: Event) => void;
  onSelectSlot?: (slotInfo: { start: Date; end: Date }) => void;
}
function CustomEvent({ event }: { event: Event }) {
  return (
    <div>

      <p style={{
        fontSize: 'medium', textWrap: 'wrap', marginBottom: '5px', marginTop: '5px', WebkitLineClamp: 2,    // <--- Anzahl der Zeilen
        WebkitBoxOrient: 'vertical',
      }}>{event.title}</p>
      <p style={{ fontSize: 'smaller', marginBottom: '5px' }}>{event.raumName}</p>
      {
        event.kommentar && (
          <div style={{ fontSize: 'smaller', opacity: 0.8 }}>
            {event.kommentar}
          </div>
        )
      }
      <p style={{ fontSize: 'smaller', marginTop: '15px' }}>{event.studiengruppenName}</p>
    </div>
  );
}

export default function BigCalendar({
  events,
  onSelectEvent,
  onSelectSlot,
}: BigCalendarProps) {
  const { i18n } = useTranslation();
  const [view, setView] = useState<View>('month' as View);
  const [date, setDate] = useState<Date>(new Date());

  // Dynamische Sprach-Messages basierend auf der aktuellen Sprache
  const messages =
    i18n.language === 'de' || i18n.language === 'de-DE'
      ? {
        month: 'Monat',
        week: 'Woche',
        day: 'Tag',
        today: 'Heute',
        previous: 'Zurück',
        next: 'Weiter',
      }
      : {
        month: 'Month',
        week: 'Week',
        day: 'Day',
        today: 'Today',
        previous: 'Back',
        next: 'Next',
      };

  const eventPropGetter = (event: Event) => {
    const color = TYP_COLORS[event.typ] || '#1976d2';
    const bg_color = TYP_COLORS_BG[event.typ] || '#1976d28f';
    return {
      style: {
        backgroundColor: bg_color,
        borderLeftStyle: 'solid' as const,
        borderLeftColor: color,
        borderLeftWidth: 6,
        borderRadius: 6,
        color: '#fff',
        fontWeight: 600,
        paddingLeft: 3
      },
    };
  };

  return (
    <div
      role="region"
      aria-labelledby="calendar-heading"
      aria-live="polite"
      style={{
        height: '100%',
        width: '100%',
        background: 'white',
        borderRadius: 0,
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/*      <h2
        id="calendar-heading"
        style={{ position: 'absolute', left: '-9999px' }}
      >
        Kalenderansicht – Stundenplan
      </h2>*/}
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%', width: '100%' }}
        views={['month', 'week', 'day']}
        defaultView="month"
        toolbar={true}
        selectable={true}
        onSelectSlot={onSelectSlot}
        components={{
          toolbar: CustomToolbar,
          eventWrapper: ({ event, children }: AccessibleEventWrapperProps) => (
            <div
              tabIndex={0}
              role="button"
              aria-label={`${event.title}, ${new Date(
                event.start
              ).toLocaleTimeString('de-DE', {
                hour: '2-digit',
                minute: '2-digit',
              })} bis ${new Date(event.end).toLocaleTimeString('de-DE', {
                hour: '2-digit',
                minute: '2-digit',
              })}`}
              onClick={() => onSelectEvent?.(event)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') onSelectEvent?.(event);
              }}
              style={{ outline: 'none' }}
            >
              {children}
            </div>
          ),
          event: CustomEvent
        }}
        view={view}
        date={date}
        onNavigate={(newDate) => {
          setDate(newDate as Date);
        }}
        onView={(nextView) => {
          setView(nextView);
        }}
        culture={
          i18n.language === 'de' || i18n.language === 'de-DE' ? 'de' : 'en'
        }
        messages={messages}
        onSelectEvent={onSelectEvent}
        eventPropGetter={eventPropGetter}
      />
    </div>
  );
}
