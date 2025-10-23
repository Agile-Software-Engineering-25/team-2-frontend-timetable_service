import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useFormContext } from '../../contexts/FormContext.tsx';
import { useEffect, useState } from 'react';
import { getGroups } from '@/api/getGroups.ts';

export const StudienGruppen: string[] = [
  'BIN-T-23-F1',
  'BIN-T-23-F2',
  'BIN-T-23-F3',
  'BIN-T-23-F4',
  // ... hier die restlichen Gruppen eintragen
];

export default function StudienGruppeDropdown() {
  const { formState, updateField } = useFormContext();
  const [studyGroups, setStudyGroups] = useState<string[] | null>(null);
  useEffect(() => {
    let ignoreResult = false;
    getGroups().then((result) => {
      if (ignoreResult) return;
      const groups = result.groups.map((group: { name: string }) => group.name);
      // Beispiele
      // const groups = result.groups.map((group) => ({ name: group.name, count: group.students_count }));
      // const allStudentUUIDs = result.groups.flatMap((group) => group.students.map((student) => student.uuid));
      setStudyGroups(groups);
    })
    return () => {
      ignoreResult = true;
    };
  }, []);
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
