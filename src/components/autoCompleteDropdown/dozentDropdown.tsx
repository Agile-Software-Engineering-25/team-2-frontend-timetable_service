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

export default function DozentDropdown() {
  const { formState, updateField } = useFormContext();
  const [lecturer, setLecturer] = useState<string[] | null>(null);
  useEffect(() => {
    let ignoreResult = false;
    getLecturers().then((result) => {
      if (ignoreResult) return;
      const lecturers = result.map((doz: { title?: string; firstName: string; lastName: string }) => {
        let fullName = '';
        if (doz.title) {
          fullName = doz.title + ' ';
        }
        fullName += doz.firstName + ' ' + doz.lastName;
        return fullName.trim();
      });
      setLecturer(lecturers);
    })
    return () => {
      ignoreResult = true;
    };
  }, []);
  return (
    <Box>
      <Autocomplete
        fullWidth
        options={lecturer ?? []}
        value={formState.dozent}
        onChange={(_, value) => updateField('dozent', value)}
        // Live-Filter beim Tippen (Standard), fallunabhängig
        autoHighlight
        renderInput={(params) => (
          <TextField
            {...params}
            label="Dozent"
            placeholder="Name tippen, um zu filtern"
          />
        )}
      />
    </Box>
  );
}
