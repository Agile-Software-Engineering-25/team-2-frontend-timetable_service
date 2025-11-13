import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useFormContext } from '../../contexts/FormContext.tsx';
import { useEffect, useState } from 'react';
import { getModules } from '@/api/getModules.ts';
import useUser from '@/hooks/useUser.ts';

export interface Module {
  name: string;
  id: string;
}

export function ModulDropdown({
  isTeacher,
  isAdmin,
}: {
  isTeacher: boolean;
  isAdmin: boolean;
}) {
  const { formState, updateField } = useFormContext();
  const [modules, setModules] = useState<string[] | null>(null);
  const user = useUser();
  const token = user.getAccessToken() || '';

  useEffect(() => {
    let ignoreResult = false;
    getModules(token).then((result) => {
      if (ignoreResult) return;
      const modules = result.map((module: any) => {
        return module.template.name ;
      });
      setModules(modules);
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
        options={modules ?? []}
        value={formState.modul}
        onChange={(_, value) => updateField('modul', value)}
        // Live-Filter beim Tippen (Standard), fallunabhängig
        autoHighlight
        renderInput={(params) => (
          <TextField {...params} label="" placeholder="" />
        )}
      />
    </Box>
  );
}
