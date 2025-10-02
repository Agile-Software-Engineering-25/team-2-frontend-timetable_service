// src/components/AdministrationNavbar/AdministrationForm.tsx
import {Box,Typography,TextField,InputAdornment,Autocomplete} from "@mui/material";
import { StudienGruppen } from "../../components/autoCompleteDropdown/studienGruppeDropdown";
import { MODULE } from "../../components/autoCompleteDropdown/modulDropdown";
import { DOZENTEN } from "../../components/autoCompleteDropdown/dozentDropdown";
import { TYPEN } from "../../components/autoCompleteDropdown/veranstaltungsTypDropdown";
import { RAEUME } from "../../components/autoCompleteDropdown/raumDropdown";
import TYP_COLORS from "./typColors";

interface Props {
  studiengruppe: string;
  setStudiengruppe: (val: string) => void;
  modul: string;
  setModul: (val: string) => void;
  raum: string;
  setRaum: (val: string) => void;
  typ: string;
  setTyp: (val: string) => void;
  dozent: string;
  setDozent: (val: string) => void;
  kommentar: string;
  setKommentar: (val: string) => void;
}

/**
 * Styling für die einzelnen Input-Felder (TextField innerhalb Autocomplete)
 * - weiße Fläche
 * - runde Ecken
 * - eingestellte Textfarbe (blau) und fettes Gewicht
 */
const fieldSx = {
  bgcolor: "#fff",
  borderRadius: 1.5,
  "& .MuiOutlinedInput-root": {
    padding: "0 10px",        // gleichmäßiger Innenabstand
    height: 40,               // Höhe kontrollieren
  },
  "& .MuiInputBase-input": {
    color: "#0A2E65",
    fontWeight: 700,
    fontSize: "0.95rem",
    padding: "8px 0",        // reduziert das „weiße Drumherum“
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "transparent",
  },
  boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
};


export default function AdministrationForm({
  studiengruppe,
  setStudiengruppe,
  modul,
  setModul,
  raum,
  setRaum,
  typ,
  setTyp,
  dozent,
  setDozent,
  kommentar,
  setKommentar,
}: Props) {
  return (
    <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
      {/* Studiengruppe */}
      <Box>
        <Typography sx={{ fontWeight: 600, mb: 0.5, color: "#0d0d0d" }}>
          Studiengruppe
        </Typography>
        <Autocomplete
          freeSolo={false}
          options={StudienGruppen ?? []}
          value={studiengruppe || null}
          onChange={(_, val: string | null) => setStudiengruppe(val ?? "")}
          disableClearable={false}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Studiengruppe wählen"
              size="small"
              sx={fieldSx}
            />
          )}
        />
      </Box>

      {/* Modul */}
      <Box>
        <Typography sx={{ fontWeight: 600, mb: 0.5, color: "#0d0d0d" }}>
          Modul
        </Typography>
        <Autocomplete
          freeSolo={false}
          options={MODULE ?? []}
          value={modul || null}
          onChange={(_, val: string | null) => setModul(val ?? "")}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Modul wählen"
              size="small"
              sx={fieldSx}
            />
          )}
        />
      </Box>

      {/* Raum */}
      <Box>
        <Typography sx={{ fontWeight: 600, mb: 0.5, color: "#0d0d0d" }}>
          Raum
        </Typography>
        <Autocomplete
          freeSolo={false}
          options={RAEUME ?? []}
          value={raum || null}
          onChange={(_, val: string | null) => setRaum(val ?? "")}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Raum wählen"
              size="small"
              sx={fieldSx}
            />
          )}
        />
      </Box>

      {/* Typ (mit farbigem Punkt) */}
      <Box>
        <Typography sx={{ fontWeight: 600, mb: 0.5, color: "#0d0d0d" }}>
          Typ
        </Typography>
        <Autocomplete
          freeSolo={false}
          options={TYPEN ?? []}
          value={typ || null}
          onChange={(_, val: string | null) => setTyp(val ?? "")}
          renderOption={(props, option) => (
            <li {...props}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    bgcolor: (TYP_COLORS as any)[option] || "#9aa",
                    boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.05)",
                  }}
                />
                <Box component="span">{option}</Box>
              </Box>
            </li>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Typ wählen"
              size="small"
              sx={fieldSx}
            />
          )}
        />
      </Box>

      {/* Dozent (ganze Breite) */}
      <Box sx={{ gridColumn: "1 / -1" }}>
        <Typography sx={{ fontWeight: 600, mb: 0.5, color: "#0d0d0d" }}>
          Dozent/-in
        </Typography>
        <Autocomplete
          freeSolo={false}
          options={DOZENTEN ?? []}
          value={dozent || null}
          onChange={(_, val: string | null) => setDozent(val ?? "")}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Dozent wählen"
              size="small"
              sx={{ ...fieldSx, height: "48px" }}
            />
          )}
        />
      </Box>

      {/* Kommentar (ganze Breite) */}
      <Box sx={{ gridColumn: "1 / -1" }}>
        <Typography sx={{ fontWeight: 600, mb: 0.5, color: "#0d0d0d" }}>
          Veranstaltungskommentar (optional)
        </Typography>
        <TextField
          value={kommentar}
          onChange={(e) => setKommentar(e.target.value)}
          fullWidth
          multiline
          rows={3}
          placeholder="Bitte Spaß mitbringen"
          inputProps={{ maxLength: 250 }}
          InputProps={{
            endAdornment: (
              <InputAdornment
                position="end"
                sx={{
                  alignSelf: "flex-end",
                  mt: "auto",
                  transform: "translateY(12px)",
                }}
              >
                <span
                  style={{
                    fontSize: "0.75rem",
                    color: kommentar.length >= 250 ? "red" : "#666",
                  }}
                >
                  {kommentar.length}/250
                </span>
              </InputAdornment>
            ),
          }}
          sx={{
            bgcolor: "#fff",
            borderRadius: 1.5,
            "& .MuiInputBase-input": { color: "#0A2E65", fontWeight: 600 },
          }}
        />
      </Box>
    </Box>
  );
}








