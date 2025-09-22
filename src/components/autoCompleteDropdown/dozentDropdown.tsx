import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useFormContext } from '../../contexts/FormContext.tsx';

const DOZENTEN: string[] = [
  'Folk, Florian',
  'Grebner, Olaf',
  'Bach, Oliver',
  // ... hier die restlichen Dozenten eintragen
];

export default function DozentDropdown() {
  const { formState, updateField } = useFormContext();

  return (
    <Box>
      <Autocomplete
        fullWidth
        options={DOZENTEN}
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
