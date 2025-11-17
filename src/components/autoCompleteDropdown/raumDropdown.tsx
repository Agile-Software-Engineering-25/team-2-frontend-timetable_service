import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useFormContext } from '../../contexts/FormContext.tsx';
import { useEffect, useState } from 'react';
import { getRoomBooking, type RoomData } from '@/api/getRooms.ts';
import useUser from '@/hooks/useUser.ts';

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
  const user = useUser();
  const token = user.getAccessToken() || '';

  useEffect(() => {
    let ignoreResult = false;
    const roomBody: RoomData = {
      startTime: formState.startTime ?? new Date().toISOString(),
      endTime: formState.endTime ?? new Date().toISOString(),
      groupId: formState.studienGruppe ?? "",
      characteristics: []
    }
    getRoomBooking(token, roomBody).then((result) => {
      if (ignoreResult) return;
      const rooms = result.rooms.map((rooms: { name: string; id: string }) => {
        return { name: rooms.name, id: rooms.id };
      });
      setRoom(rooms);
    });
    return () => {
      ignoreResult = true;
    };
  }, [token, formState]);
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
