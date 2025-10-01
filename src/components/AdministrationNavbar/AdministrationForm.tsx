import { Box, Typography, FormControl, Select, MenuItem, TextField, InputAdornment } from "@mui/material";
import { StudienGruppen } from "../../components/autoCompleteDropdown/studienGruppeDropdown";
import { MODULE }  from "../../components/autoCompleteDropdown/modulDropdown";
import  { DOZENTEN }  from "../../components/autoCompleteDropdown/dozentDropdown";
import  { TYPEN }  from "../../components/autoCompleteDropdown/veranstaltungsTypDropdown";
import TYP_COLORS from "./typColors";
import { RAEUME } from "../autoCompleteDropdown/raumDropdown";

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
  borderWidth: "2px",
  color: "#0A2E65",
  "& .MuiSelect-icon": { color: "#0A2E65" },
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
        <Typography sx={{ fontWeight: 600, mb: 0.5, color: "#0d0d0dff" }}>
          Studiengruppe
        </Typography>
        <FormControl fullWidth>
          <Select
            value={studiengruppe}
            onChange={(e) => setStudiengruppe(e.target.value)}
            sx={selectSx}
          >
            {StudienGruppen.map((gruppe) => (
              <MenuItem key={gruppe} value={gruppe}>
                {gruppe}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Modul */}
      <Box>
        <Typography sx={{ fontWeight: 600, mb: 0.5, color: "#0d0d0dff" }}>
          Modul
        </Typography>
        <FormControl fullWidth>
          <Select
            value={modul}
            onChange={(e) => setModul(e.target.value)}
            sx={selectSx}
          >
            {MODULE.map((modul) => (
              <MenuItem key={modul} value={modul}>
                {modul}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Raum */}
      <Box>
        <Typography sx={{ fontWeight: 600, mb: 0.5, color: "#0d0d0dff" }}>
          Raum
        </Typography>
        <FormControl fullWidth>
          <Select
            value={raum}
            onChange={(e) => setRaum(e.target.value)}
            sx={selectSx}
          >
            {RAEUME.map((raum) => (
              <MenuItem key={raum} value={raum}>
                {raum}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Typ */}
      <Box>
        <Typography sx={{ fontWeight: 600, mb: 0.5, color: "#0d0d0dff" }}>
          Typ
        </Typography>
        <FormControl fullWidth>
          <Select
            value={typ}
            onChange={(e) => setTyp(e.target.value)}
            sx={selectSx}
          >
            {TYPEN.map((t) => (
              <MenuItem key={t} value={t}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Box
                    sx={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      bgcolor: TYP_COLORS[t] || "#999",
                    }}
                  />
                  {t}
                </Box>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Dozent */}
      <Box sx={{ gridColumn: "1 / -1" }}>
        <Typography sx={{ fontWeight: 600, mb: 0.5, color: "#0d0d0dff" }}>
          Dozent/-in
        </Typography>
        <FormControl fullWidth>
          <Select
            value={dozent}
            onChange={(e) => setDozent(e.target.value)}
            sx={selectSx}
          >
            {DOZENTEN.map((d) => (
              <MenuItem key={d} value={d}>
                {d}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Kommentar */}
      <Box sx={{ gridColumn: "1 / -1" }}>
        <Typography sx={{ fontWeight: 600, mb: 0.5, color: "#0d0d0dff" }}>
          Veranstaltungskommentar (optional)
        </Typography>
        <TextField
          value={kommentar}
          onChange={(e) => setKommentar(e.target.value)}
          fullWidth
          multiline
          rows={2}
          placeholder="Bitte Spaß mitbringen"
          inputProps={{ maxLength: 250 }}
          InputProps={{
            endAdornment: (
              <InputAdornment
                position="end"
                sx={{ alignSelf: "flex-end", mt: "auto", transform: "translateY(15px)" }}
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
            "& .MuiInputBase-input": { color: "#004080", fontWeight: 600 },
          }}
        />
      </Box>
    </Box>
  );
}







