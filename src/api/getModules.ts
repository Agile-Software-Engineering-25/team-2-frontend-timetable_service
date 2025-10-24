export async function getModules() {
  return fetch('https://sau-portal.de/api/masterdata/studies/modules/')
     .then((response) => response.json())
     .then((data) => {
       return data;
     })
     .catch((error) => {
       console.error('Error fetching lecturers:', error);
     });}

  /*return [
    {
      "id": 10,
      "template": {
        "name": "Test_Name",
        "id": 0,
        "course_templates": [
          {
            "name": "string",
            "code": "string",
            "elective": true,
            "planned_semester": 0,
            "id": 0
          }
        ]
      },
      "courses": [
        {
          "semester": 0,
          "exam_type": "string",
          "credit_points": 0,
          "total_units": 0,
          "template_id": 0,
          "id": 0,
          "template": {
            "name": "string",
            "code": "string",
            "elective": true,
            "planned_semester": 0,
            "id": 0
          },
          "students": [
            {
              "external_id": "string"
            }
          ],
          "teachers": [
            {
              "external_id": "string"
            }
          ]
        }
      ]
    }
  ]}*/