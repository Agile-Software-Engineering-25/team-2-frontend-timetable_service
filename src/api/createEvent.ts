import type { Event } from '@pages/Timetable/Timetable.tsx';

import useAxiosInstance from '@hooks/useAxiosInstance';

export async function createEvent(event: Event) {
  const body = convertToApiBody(event);
  const axios = useAxiosInstance();

  try {

    const response = await axios.post('/api/timetable/v1/event/', body)

    const responseData = await response.data;

    return responseData;
  } catch (error: any) {
    alert(
      `Veranstaltung konnte nicht erstellt werden: ${error.message}`
    );
  }

}
export async function editEvent(event: Event) {
  const body = convertToApiBody(event);
  const axios = useAxiosInstance();
  try {

    const response = await axios.put('/api/timetable/v1/event/', body)

    const responseData = await response.data;

    return responseData;
  } catch (error: any) {
    alert(
      `Veranstaltung konnte nicht bearbeitet werden: ${error.message}`
    );
  }

}
export async function deleteEvent(event: Event) {
  const axios = useAxiosInstance();
  try {

    const response = await axios.delete(`/api/timetable/v1/event/${event.id}`)

    if (response.status != 204) throw new Error(response.data);

  } catch (error: any) {
    alert(
      `Veranstaltung konnte nicht gelöscht werden: ${error.message}`
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

export async function getEvent() {
  const axios = useAxiosInstance();
  try {

    const response = await axios.get('/api/timetable/v1/schedule/')

    const responseData = await response.data;

    return responseData;
  } catch (error: any) {
    alert(
      `Veranstaltung konnte nicht geladen werden: ${error.message}`
    );
  }

}
