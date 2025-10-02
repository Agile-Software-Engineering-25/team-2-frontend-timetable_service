import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useFormContext } from '../../contexts/FormContext.tsx';

export const RAEUME: string[] = [
  "A101",
  "B835 / 1.34",
  "B202",
  // Wer hat sich gedacht "Für alles mache ich Komponenten außer für dieses eine spezifische Dropdown"??
  // Echt keinen bock mehr das ich sowas fixxen darf....

  // Hoffe das passt so
];

export default function RaumDropdown() {
  const { formState, updateField } = useFormContext();

  return (
    <Box>
      <Autocomplete
        fullWidth
        options={RAEUME}
        value={formState.raum}
        onChange={(_, value) => updateField('raum', value)}
        // Live-Filter beim Tippen (Standard), fallunabhängig
        autoHighlight
        renderInput={(params) => (
          <TextField
            {...params}
            label="Raum"
            placeholder="Raum tippen, um zu filtern"
          />
        )}
      />
    </Box>
  );
}