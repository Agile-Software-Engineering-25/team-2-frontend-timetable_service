import type { Event } from '@pages/Timetable/Timetable.tsx';

export async function createEvent(event: Event, token: string) {
  const body = convertToApiBody(event);

  const response = await fetch(
    'https://sau-portal.de/api/timetable/v1/event/',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    }
  );
  const responseData = await response.json();

  if (!response.ok) {
    alert(
      `Veranstaltung konnte nicht erstellt werden: ${responseData.message}`
    );
  } else {
    return responseData;
  }
}
export async function editEvent(event: Event, token: string) {
  const body = convertToApiBody(event);

  const response = await fetch(
    'https://sau-portal.de/api/timetable/v1/event/',
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    }
  );
  const responseData = await response.json();

  if (!response.ok) {
    alert(
      `Veranstaltung konnte nicht bearbeitet werden: ${responseData.message}`
    );
  } else {
    return responseData;
  }
}
export async function deleteEvent(event: Event, token: string) {
  const response = await fetch(
    `https://sau-portal.de/api/timetable/v1/event/${event.id}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!response.ok) {
    const responseData = await response.json();
    alert(
      `Veranstaltung konnte nicht bearbeitet werden: ${responseData.message}`
    );
  }
}
export function convertToApiBody(event: Event) {
  return {
    time: event.start,
    endTime: event.end,
    title: event.modulName,
    studyGroup: event.studiengruppenName,
    lecturer_id: event.dozentId,
    lecturer_name: event.dozentNamen,
    room_id: event.raumId,
    room_name: event.raumName,
    comment: event.kommentar,
    type: event.typ,
    module: event.modulName,
  };
}

export async function getEvent(token: string) {
  const response = await fetch(
    'https://sau-portal.de/api/timetable/v1/schedule/',
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const responseData = await response.json();

  if (!response.ok) {
    alert(
      `Veranstaltung konnte nicht bearbeitet werden: ${responseData.message}`
    );
  } else {
    return responseData;
  }
}
