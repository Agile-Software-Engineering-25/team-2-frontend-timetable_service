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
      console.error('Error fetching lecturers:', error);
    });
}
