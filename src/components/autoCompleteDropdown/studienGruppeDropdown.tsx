import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useFormContext } from '../../contexts/FormContext.tsx';
import { useEffect, useState } from 'react';
import { getGroups } from '@/api/getGroups.ts';
import useUser from '@/hooks/useUser.ts';

export default function StudienGruppeDropdown({
  isTeacher,
  isAdmin,
}: {
  isTeacher: boolean;
  isAdmin: boolean;
}) {
  const { formState, updateField } = useFormContext();
  const [studyGroups, setStudyGroups] = useState<string[] | null>(null);
  const user = useUser();
  const token = user.getAccessToken() || '';

  useEffect(() => {
    let ignoreResult = false;
    getGroups(token).then((result) => {
      if (ignoreResult) return;
      const groups = result.groups.map((group: any) => {
        return group.name;
      });
      setStudyGroups(groups);
    });
    return () => {
      ignoreResult = true;
    };
  }, [token]);
  return (
    <Box>
      <Autocomplete
        sx={{ backgroundColor: '#fff' }}
        disabled={isTeacher && !isAdmin}
        fullWidth
        options={studyGroups ?? []}
        value={formState.studienGruppe}
        onChange={(_, value) => {
          updateField('studienGruppe', value);
        }}
        // Live-Filter beim Tippen (Standard), fallunabhängig
        autoHighlight
        renderInput={(params) => (
          <TextField {...params} label="" placeholder="" />
        )}
      />
    </Box>
  );
}
