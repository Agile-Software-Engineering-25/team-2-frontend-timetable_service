import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useFormContext } from '../../contexts/FormContext.tsx';

const TYPEN: string[] = [
  'Kurs',
  'E-Learning',
  'Klausureinsicht',
  'Dekansprechstunde',
  'Prüfung',
  'Sonstiges',
  // ... hier die restlichen Dozenten eintragen
];

export default function VeranstaltungstypDropdown() {
  const { formState, updateField } = useFormContext();

  return (
    <Box>
      <Autocomplete
        fullWidth
        options={TYPEN}
        value={formState.veranstaltungstyp}
        onChange={(_, value) => updateField('veranstaltungstyp', value)}
        // Live-Filter beim Tippen (Standard), fallunabhängig
        autoHighlight
        renderInput={(params) => (
          <TextField
            {...params}
            label="Veranstaltungstyp"
            placeholder="Typ tippen, um zu filtern"
          />
        )}
      />
    </Box>
  );
}
