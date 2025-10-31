import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useFormContext } from '../../contexts/FormContext.tsx';
import { useEffect, useState } from 'react';
import { getLecturers } from '@/api/getLecturers.ts';

export const DOZENTEN: string[] = [
  'Volk, Florian',
  'Grebner, Olaf',
  'Bach, Oliver',
  // ... hier die restlichen Dozenten eintragen
];

export interface Lecturer {
  name: string;
  id: string;
}

export function DozentDropdown({
  isTeacher,
  isAdmin,
}: {
  isTeacher: boolean;
  isAdmin: boolean;
}) {
  const { formState, updateField } = useFormContext();
  const [lecturer, setLecturer] = useState<Lecturer[] | null>(null);
  useEffect(() => {
    let ignoreResult = false;
    getLecturers().then((result) => {
      if (ignoreResult) return;
      const lecturers = result.map(
        (doz: {
          title?: string;
          firstName: string;
          lastName: string;
          id: string;
        }) => {
          let fullName = '';
          if (doz.title) {
            fullName = doz.title + ' ';
          }
          fullName += doz.firstName + ' ' + doz.lastName;
          return { name: fullName.trim(), id: doz.id };
        }
      );
      setLecturer(lecturers);
    });
    return () => {
      ignoreResult = true;
    };
  }, []);
  return (
    <Box>
      <Autocomplete
        sx={{ backgroundColor: '#fff' }}
        disabled={isTeacher && !isAdmin}
        fullWidth
        options={lecturer ?? []}
        value={formState.dozent}
        onChange={(_, value) => updateField('dozent', value)}
        getOptionLabel={(option) => option.name}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        // Live-Filter beim Tippen (Standard), fallunabhängig
        autoHighlight
        renderInput={(params) => (
          <TextField {...params} label="" placeholder="" />
        )}
      />
    </Box>
  );
}
