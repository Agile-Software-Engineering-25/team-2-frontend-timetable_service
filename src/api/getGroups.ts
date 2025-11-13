export async function getGroups(token: string) {
  console.log(token)
  return fetch(
    'https://sau-portal.de/team-11-api/api/v1/group?withDetails=false',
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
      console.error('Error fetching study groups:', error);
      return [];
    });
}
