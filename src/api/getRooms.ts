
export interface RoomData {
  startTime: string | Date,
  endTime: string | Date,
  groupId: string | Date,
  characteristics:
  {
    type?: string,
    value?: {},
    operator?: any
  }[]

}
export async function getRooms(token: string) {
  return fetch('https://sau-portal.de/ase-1/room-mgmt/rooms', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error('Error fetching room:', error);
    });
}
export async function getRoomBooking(token: string, roomData: RoomData) {

  return fetch('https://api.provadis.com/v1/rooms/inquiry', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(roomData)
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error('Error fetching room:', error);
    });
}
