import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useFormContext } from '../../contexts/FormContext.tsx';
import { useEffect, useState } from 'react';
import { getGroups } from '@/api/getGroups.ts';

export default function StudienGruppeDropdown() {
  const { formState, updateField } = useFormContext();
  const [studyGroups, setStudyGroups] = useState<string[] | null>(null);
  useEffect(() => {
    let ignoreResult = false;
    getGroups().then((result) => {
      if (ignoreResult) return;
      const groups = result.groups.map((group: any ) => {return  group.name });
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
        options={studyGroups ?? []}
        value={formState.studienGruppe}
        onChange={(_, value) => {updateField('studienGruppe', value);}}
        // Live-Filter beim Tippen (Standard), fallunabhängig
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
