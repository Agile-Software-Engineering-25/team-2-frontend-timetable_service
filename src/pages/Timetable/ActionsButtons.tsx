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
        aria-label="Neue Veranstaltung hinzufügen"
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
            border: "1px solid #0A2E65",
            "&:focus-visible": { outline: "3px solid #FFBF47" }
          }}
          aria-label={
            eventExists
              ? "Veranstaltung aktualisieren"
              : "Aktualisieren deaktiviert, keine Veranstaltung vorhanden"
          }
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
            borderColor: "#0A2E65",
            "&:focus-visible": { outline: "3px solid #FFBF47" }
          }}
          aria-label={
            eventExists
              ? "Veranstaltung löschen"
              : "Löschen deaktiviert, keine Veranstaltung vorhanden"
          }
        >
          Löschen
        </Button>
      </Stack>
    </Stack>
  );
}


