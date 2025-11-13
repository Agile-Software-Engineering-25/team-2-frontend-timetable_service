export function CustomEvent({ event }: { event: any }) {
  return (
    <div>
      <span>{event.start} - {event.end}</span>
      <strong>{event.title}</strong>
      {event.kommentar && (
        <div style={{ fontSize: '0.8em', opacity: 0.8 }}>
          {event.kommentar}
        </div>
      )}
      <span>{event.raumName}</span>
      <span>{event.studiengruppenName}</span>
    </div>
  );
}
