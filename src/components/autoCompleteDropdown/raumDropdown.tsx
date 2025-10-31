import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useFormContext } from '../../contexts/FormContext.tsx';
import { useEffect, useState } from 'react';
import { getRooms } from '@/api/getRooms.ts';

export const RAEUME: string[] = [
  'A101',
  'B835 / 1.34',
  'B202',
  // Wer hat sich gedacht "Für alles mache ich Komponenten außer für dieses eine spezifische Dropdown"??
  // Echt keinen bock mehr das ich sowas fixxen darf....

  // Hoffe das passt so
];

export interface Room {
  name: string;
  id: string;
}

export function RaumDropdown({
  isTeacher,
  isAdmin,
}: {
  isTeacher: boolean;
  isAdmin: boolean;
}) {
  const { formState, updateField } = useFormContext();
  const [room, setRoom] = useState<Room[] | null>(null);
  useEffect(() => {
    let ignoreResult = false;
    getRooms().then((result) => {
      if (ignoreResult) return;
      const rooms = result.rooms.map((rooms: any) => {
        return { name: rooms.name, id: rooms.id };
      });
      setRoom(rooms);
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
        options={room ?? []}
        value={formState.raum}
        onChange={(_, value) => updateField('raum', value)}
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
