import useAxiosInstance from '@hooks/useAxiosInstance';

export async function getLecturers() {
  const axios = useAxiosInstance();

  try {

    const response = await axios.post('/api/masterdata/studies/modules/')

    const responseData = await response.data;

    return responseData;
  } catch (error: any) {
    alert(
      'Error fetching modules:' + error.message
    );
  }

}

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
