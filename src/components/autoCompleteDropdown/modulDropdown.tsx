import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useFormContext } from '../../contexts/FormContext.tsx';
import { useEffect, useState } from 'react';
import { getModules } from '@/api/getModules.ts';

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
  const [modules, setModules] = useState<Module[] | null>(null);
  useEffect(() => {
    let ignoreResult = false;
    getModules().then((result) => {
      if (ignoreResult) return;
      const modules = result.map((module: any) => {
        return { name: module.template.name, id: module.id };
      });
      setModules(modules);
    });
    return () => {
      ignoreResult = true;
    };
  }, []);
  return (
    <Box>
      <Autocomplete
        sx={{ backgroundColor: '#fff' }}
        disabled={isTeacher && !isAdmin}
        fullWidth
        options={modules ?? []}
        value={formState.modul}
        onChange={(_, value) => updateField('modul', value)}
        getOptionLabel={(option) => option.name}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        // Live-Filter beim Tippen (Standard), fallunabhängig
        autoHighlight
        renderInput={(params) => (
          <TextField {...params} label="" placeholder="" />
        )}
      />
    </Box>
  );
}
