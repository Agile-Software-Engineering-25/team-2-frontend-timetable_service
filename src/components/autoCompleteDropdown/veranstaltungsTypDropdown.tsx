import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useFormContext } from '../../contexts/FormContext.tsx';

export const TYPEN: string[] = [
  'Kurs',
  'E-Learning',
  'Klausureinsicht',
  'Dekansprechstunde',
  'Prüfung',
  'Sonstiges',
];

export function VeranstaltungstypDropdown() {
  const { formState, updateField } = useFormContext();

  return (
    <Box>
      <Autocomplete
        fullWidth
        options={TYPEN}
        value={formState.veranstaltungstyp}
        onChange={(_, value) => updateField('veranstaltungstyp', value)}
        autoHighlight
        renderInput={(params) => (
          <TextField
            {...params}
            label=""
            placeholder=""
          />
        )}
      />
    </Box>
  );
}
