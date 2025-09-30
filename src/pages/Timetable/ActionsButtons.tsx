import { Button, Stack } from "@mui/material";
import { CalendarMonth, Edit, Close } from "@mui/icons-material";

interface Props {
  eventExists: boolean;
  onAdd: () => void;
  onUpdate: () => void;
  onDelete: () => void;
}

export default function ActionButtons({ eventExists, onAdd, onUpdate, onDelete }: Props) {
  return (
    <Stack spacing={1}>
      <Button
        variant="contained"
        fullWidth
        onClick={onAdd}
        startIcon={<CalendarMonth />}
        sx={{
          bgcolor: "#0A2E65",
          color: "white",
          "&:hover": { bgcolor: "#072241" },
          fontWeight: 600,
          py: 1.4,
          borderRadius: 1.5,
        }}
      >
        VERANSTALTUNG HINZUFÜGEN
      </Button>

      {/* Nebeneinander */}
      <Stack direction="row" spacing={1}>
        <Button
          variant="contained"
          fullWidth
          onClick={onUpdate}
          startIcon={<Edit />}
          disabled={!eventExists}
          sx={{
            fontWeight: 600,
            bgcolor: eventExists ? "#ffffff" : "#f0f2f4",
            color: eventExists ? "#0A2E65" : "#8b9096",
          }}
        >
          Aktualisieren
        </Button>

        <Button
          variant="outlined"
          fullWidth
          onClick={onDelete}
          startIcon={<Close />}
          disabled={!eventExists}
          sx={{
            fontWeight: 600,
            color: eventExists ? "#0A2E65" : "#8b9096",
          }}
        >
          Löschen
        </Button>
      </Stack>
    </Stack>
  );
}


