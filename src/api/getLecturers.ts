export async function getLecturers(token: string) {
  return fetch(
    'https://sau-portal.de/team-11-api/api/v1/users?withDetails=true&userType=lecturer',
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error('Error fetching lecturers:', error);
    });
}
