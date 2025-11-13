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
    'https://sau-portal.de/api/timetable/v1/event/'+ event.id,
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

export async function getEvent(token: string): Promise<Event[]> {
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
    return []
  } else {
    const events = convertToEvent(responseData);
    console.log(events)
    return events
  }
}
interface ApiResponse {
  id: string,
  endTime: string
  lecturer_id: string
  lecturer_name: string
  module: string
  room_id: string
  room_name: string
  studyGroup: string
  time: string
  title: string
  type: string
  createdAt: Date | string | null,
  comment?: string
}
function convertToEvent(responseData: ApiResponse[]): Event[] {
  return responseData.map((response: ApiResponse) => ({
    id: response.id,
    title: response.title,
    start: new Date(response.time),
    end: new Date(response.time),
    studiengruppenName: response.studyGroup,
    modulName: response.module,
    raumName: response.room_name,
    raumId: response.room_id,
    typ: response.type,
    dozentNamen: response.lecturer_name,
    dozentId: response.lecturer_id,
    kommentar: response.comment ?? ""
  }))
}