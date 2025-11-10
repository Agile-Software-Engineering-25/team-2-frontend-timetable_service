import { TokenService } from "./getToken";
const tokenService = new TokenService();
async function getToken() {
  return tokenService.getToken();
}
export async function getLecturers() {
  return fetch('https://sau-portal.de/team-11-api/api/v1/users?withDetails=true&userType=lecturer', {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${await getToken()}`,
    }
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error('Error fetching lecturers:', error);
    });

/*  return [
    {
      id: '8cd21428-49f2-4d80-882c-7f83e966afbf',
      dateOfBirth: '1975-01-01',
      address: 'Lecturer Address',
      phoneNumber: '+4915100000073',
      username: 'lecturer_3@test.com',
      firstName: 'LecturerFirstName',
      lastName: 'LastName3',
      email: 'lecturer_3@test.com',
      employeeNumber: 'L-003',
      department: 'IT',
      officeNumber: 'C3',
      workingTimeModel: 'FULL_TIME',
      fieldChair: 'Field 3',
      title: 'Prof. Dr.',
      employmentStatus: 'FULL_TIME_PERMANENT',
    },
    {
      id: 'af98937b-14e1-4350-83d5-9c95256174f4',
      dateOfBirth: '1975-01-01',
      address: 'Lecturer Address',
      phoneNumber: '+4915100000074',
      username: 'lecturer_4@test.com',
      firstName: 'LecturerFirstName',
      lastName: 'LastName4',
      email: 'lecturer_4@test.com',
      employeeNumber: 'L-004',
      department: 'IT',
      officeNumber: 'C4',
      workingTimeModel: 'FULL_TIME',
      fieldChair: 'Field 4',
      title: 'Prof. Dr.',
      employmentStatus: 'FULL_TIME_PERMANENT',
    },
    {
      id: 'f5534e30-bbe0-429d-810a-92ba7b667521',
      dateOfBirth: '1975-01-01',
      address: 'Lecturer Address',
      phoneNumber: '+4915100000071',
      username: 'lecturer_1@test.com',
      firstName: 'LecturerFirstName',
      lastName: 'LastName1',
      email: 'lecturer_1@test.com',
      employeeNumber: 'L-001',
      department: 'IT',
      officeNumber: 'C1',
      workingTimeModel: 'FULL_TIME',
      fieldChair: 'Field 1',
      title: 'Prof. Dr.',
      employmentStatus: 'FULL_TIME_PERMANENT',
    },
    {
      id: 'fc6ac29a-b9dd-4b35-889f-2baff71f3be1',
      dateOfBirth: '1980-01-01',
      address: 'Test Address 2',
      phoneNumber: '987654321',
      username: 'test-doz@sau-portal.de',
      firstName: 'Test',
      lastName: 'Doz',
      email: 'test-doz@sau-portal.de',
      employeeNumber: 'L123',
      fieldChair: 'Software Engineering',
      title: 'Dr.',
      employmentStatus: 'FULL_TIME_PERMANENT',
    },
    {
      id: '7428f350-231c-40d5-b62b-07c4d50108e3',
      dateOfBirth: '1975-01-01',
      address: 'Lecturer Address',
      phoneNumber: '+4915100000072',
      username: 'lecturer_2@test.com',
      firstName: 'LecturerFirstName',
      lastName: 'LastName2',
      email: 'lecturer_2@test.com',
      employeeNumber: 'L-002',
      department: 'IT',
      officeNumber: 'C2',
      workingTimeModel: 'FULL_TIME',
      fieldChair: 'Field 2',
      title: 'Prof. Dr.',
      employmentStatus: 'FULL_TIME_PERMANENT',
    },
  ];
}*/
