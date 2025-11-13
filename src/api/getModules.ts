export async function getModules(token: string) {
  return fetch('https://sau-portal.de/api/masterdata/studies/modules/', {
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
