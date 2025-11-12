import type { Event } from '@pages/Timetable/Timetable.tsx';
import type { AxiosInstance } from 'axios';

export async function createEvent(event: Event, axiosInstance: AxiosInstance) {
  const body = convertToApiBody(event);
  try {
    const response = await axiosInstance.post('/api/timetable/v1/event/', body);

    const responseData = await response.data;

    return responseData;
  } catch (error: any) {
    alert(`Veranstaltung konnte nicht erstellt werden: ${error.message}`);
  }
}
export async function editEvent(event: Event, axiosInstance: AxiosInstance) {
  const body = convertToApiBody(event);
  try {
    const response = await axiosInstance.put('/api/timetable/v1/event/', body);

    const responseData = await response.data;

    return responseData;
  } catch (error: any) {
    alert(`Veranstaltung konnte nicht bearbeitet werden: ${error.message}`);
  }
}
export async function deleteEvent(event: Event, axiosInstance: AxiosInstance) {
  try {
    const response = await axiosInstance.delete(
      `/api/timetable/v1/event/${event.id}`
    );

    if (response.status != 204) throw new Error(response.data);
  } catch (error: any) {
    alert(`Veranstaltung konnte nicht gelöscht werden: ${error.message}`);
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

export async function getEvent(axiosInstance: AxiosInstance) {
  try {
    const response = await axiosInstance.get('/api/timetable/v1/schedule/');

    const responseData = await response.data;

    return responseData;
  } catch (error: any) {
    alert(`Veranstaltung konnte nicht geladen werden: ${error.message}`);
  }
}
