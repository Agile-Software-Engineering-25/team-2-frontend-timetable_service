import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useFormContext } from '../../contexts/FormContext.tsx';

export const MODULE: string[] = [
  'Grundlagen der Programmierung',
  'Big Data',
  'Agile Software Engineering',
  // ... hier die restlichen Dozenten eintragen
];

export default function ModulDropdown() {
  const { formState, updateField } = useFormContext();

  return (
    <Box>
      <Autocomplete
        fullWidth
        options={MODULE}
        value={formState.modul}
        onChange={(_, value) => updateField('modul', value)}
        // Live-Filter beim Tippen (Standard), fallunabhängig
        autoHighlight
        renderInput={(params) => (
          <TextField
            {...params}
            label="Modul"
            placeholder="Modul tippen, um zu filtern"
          />
        )}
      />
    </Box>
  );
}
