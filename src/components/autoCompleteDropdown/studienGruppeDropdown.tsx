import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useFormContext } from '../../contexts/FormContext.tsx';

export const StudienGruppen: string[] = [
  'BIN-T-23-F1',
  'BIN-T-23-F2',
  'BIN-T-23-F3',
  'BIN-T-23-F4',
  // ... hier die restlichen Gruppen eintragen
];

export default function StudienGruppeDropdown() {
  const { formState, updateField } = useFormContext();

  return (
    <Box>
      <Autocomplete
        fullWidth
        options={StudienGruppen}
        value={formState.studienGruppe}
        onChange={(_, value) => updateField('studienGruppe', value)}
        // Live-Filter beim Tippen (Standard), fallunabhängig
        autoHighlight
        renderInput={(params) => (
          <TextField
            {...params}
            label="Studiengruppe"
            placeholder="Studiengruppe suchen, um zu filtern"
          />
        )}
      />
    </Box>
  );
}
