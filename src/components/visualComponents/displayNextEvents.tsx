import React from 'react';
import './eventList.css';
import type { Event } from '@/pages/Timetable/Timetable';

const typeColors: Record<string, string> = {
  Kurs: '#1976d2',
  'E-Learning': '#388e3c',
  Klausureinsicht: '#fbc02d',
  Dekansprechstunde: '#8e24aa',
  Prüfung: '#d32f2f',
  Sonstiges: '#616161',
};

interface EventListProps {
  events: Event[];
}

const formatDate = (date: Date) =>
  new Date(date).toLocaleString('de-DE', {
    dateStyle: 'short',
    timeStyle: 'short',
  });

const EventList: React.FC<EventListProps> = ({ events }) => {
  // Alle zukünftigen Events sortiert
  const allUpcoming = React.useMemo(
    () =>
      events
        .filter((e) => new Date(e.start) > new Date())
        .sort(
          (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime()
        ),
    [events]
  );

  // Aufteilung: Klausuren (typ === 'Prüfung') und sonstige Termine
  const sortedExams = React.useMemo(
    () => allUpcoming.filter((e) => e.typ === 'Prüfung'),
    [allUpcoming]
  );
  const upcomingEvents = React.useMemo(
    () => allUpcoming.filter((e) => e.typ !== 'Prüfung'),
    [allUpcoming]
  );

  return (
    <div className="events-container">
      <div className="events-half scrollable">
        <h2>Nächste Termine</h2>
        {upcomingEvents.length === 0 ? (
          <div className="placeholder">Keine bevorstehenden Termine.</div>
        ) : (
          upcomingEvents.map((event) => (
            <div
              className="event-box"
              key={event.id}
              style={{
                borderLeft: `8px solid ${typeColors[event.typ] ?? '#616161'}`,
              }}
            >
              <div className="event-title">{event.title}</div>
              <div className="event-info">
                {formatDate(event.start)} - {formatDate(event.end)}
              </div>
              <div className="event-detail">{event.modulName}</div>
              <div className="event-detail">{event.dozentNamen}</div>
              <div className="event-detail">Raum: {event.raumName}</div>
              {event.kommentar && (
                <div className="event-comment">{event.kommentar}</div>
              )}
            </div>
          ))
        )}
      </div>
      <div className="exams-half scrollable">
        <h2>Klausuren</h2>
        {sortedExams.length === 0 ? (
          <div className="placeholder">Keine anstehenden Klausuren.</div>
        ) : (
          sortedExams.map((exam) => (
            <div
              className="event-box"
              key={exam.id}
              style={{
                borderLeft: `8px solid ${typeColors[exam.typ] ?? '#616161'}`,
              }}
            >
              <div className="event-title">{exam.title}</div>
              <div className="event-info">{formatDate(exam.start)}</div>
              <div className="event-detail">{exam.modulName}</div>
              <div className="event-detail">Dozent: {exam.dozentNamen}</div>
              {exam.kommentar && (
                <div className="event-comment">{exam.kommentar}</div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default EventList;
