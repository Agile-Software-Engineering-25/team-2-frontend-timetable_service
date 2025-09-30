
import { Box, Typography, FormControl, Select, MenuItem, TextField } from "@mui/material";
import { StudienGruppen } from "../../components/autoCompleteDropdown/studienGruppeDropdown";
import { MODULE } from "../../components/autoCompleteDropdown/modulDropdown";
import { DOZENTEN } from "../../components/autoCompleteDropdown/dozentDropdown";
import { TYPEN } from "../../components/autoCompleteDropdown/veranstaltungsTypDropdown";
import { RAEUME } from "../../components/autoCompleteDropdown/raumDropdown";

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

const selectSx = {
  bgcolor: "#fff",
  borderRadius: 1.5,
  height: 44,
  px: 1.5,
  fontWeight: 600,
  color: "#004080",
  "& .MuiSelect-icon": { color: "#004080" },
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
        <Typography sx={{ fontWeight: 600, mb: 0.5, color: "#004080" }}>
          Studiengruppe
        </Typography>
        <FormControl fullWidth>
          <Select
            value={studiengruppe}
            onChange={(e) => setStudiengruppe(e.target.value)}
            sx={selectSx}
          >
            {StudienGruppen.map((gruppe) => (
              <MenuItem key={gruppe} value={gruppe}>{gruppe}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Modul */}
      <Box>
        <Typography sx={{ fontWeight: 600, mb: 0.5, color: "#004080" }}>
          Modul
        </Typography>
        <FormControl fullWidth>
          <Select
            value={modul}
            onChange={(e) => setModul(e.target.value)}
            sx={selectSx}
          >
            {MODULE.map((modulOpt) => (
              <MenuItem key={modulOpt} value={modulOpt}>{modulOpt}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Raum */}
      <Box>
        <Typography sx={{ fontWeight: 600, mb: 0.5, color: "#004080" }}>
          Raum
        </Typography>
        <FormControl fullWidth>
          <Select
            value={raum}
            onChange={(e) => setRaum(e.target.value)}
            sx={selectSx}
          >
            {RAEUME.map((raumOpt) => (
              <MenuItem key={raumOpt} value={raumOpt}>{raumOpt}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Typ (Radio Buttons) */}
      <Box>
        <Typography sx={{ fontWeight: 600, mb: 0.5, color: "#004080" }}>
          Typ
        </Typography>
           <FormControl fullWidth>
          <Select value={typ} onChange={(e) => setTyp(e.target.value)} sx={selectSx}>
            {TYPEN.map((typOpt) => (
              <MenuItem key={typOpt} value={typOpt}>{typOpt}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Dozent */}
      <Box sx={{ gridColumn: "1 / -1" }}>
        <Typography sx={{ fontWeight: 600, mb: 0.5, color: "#004080" }}>
          Dozent/-in
        </Typography>
        <FormControl fullWidth>
          <Select
            value={dozent}
            onChange={(e) => setDozent(e.target.value)}
            sx={selectSx}
          >
            {DOZENTEN.map((dozentOpt) => (
              <MenuItem key={dozentOpt} value={dozentOpt}>{dozentOpt}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Kommentar */}
      <Box sx={{ gridColumn: "1 / -1" }}>
        <Typography sx={{ fontWeight: 600, mb: 0.5, color: "#004080" }}>
          Veranstaltungskommentar
        </Typography>
        <TextField
          value={kommentar}
          onChange={(e) => setKommentar(e.target.value)}
          fullWidth
          multiline
          rows={2}
          placeholder="Bitte Spaß mitbringen"
          sx={{
            bgcolor: "#fff",
            borderRadius: 1.5,
            "& .MuiInputBase-input": { color: "#004080", fontWeight: 600 },
          }}
        />
      </Box>
    </Box>
  );
}







