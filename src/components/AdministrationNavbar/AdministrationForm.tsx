import { 
  Box, 
  Typography, 
  TextField, 
  InputAdornment, 
  Autocomplete 
} from "@mui/material";
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
    <Box sx={{ p: 2 }}>
      {/* Trennlinie */}
      <Box sx={{ borderTop: "1px solid #dcdcdc", width: "100%", mb: 2 }} />

      {/* Verwaltung + Datum + Uhrzeit */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
          mt: -1, // Verwaltung etwas höher schieben
        }}
      >
        <Typography sx={{ fontWeight: 600, fontSize: "1rem", color: "#0d0d0d" }}>
          Verwaltung
        </Typography>
      </Box>

      {/* Formular */}
      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
        {/* Studiengruppe */}
        <Box>
          <Typography sx={{ fontWeight: 600, mb: 0.5, color: "#0d0d0dff" }}>
            Studiengruppe
          </Typography>
          <Autocomplete
            fullWidth
            options={StudienGruppen}
            value={studiengruppe || ""}
            onChange={(_, val) => setStudiengruppe(val || "")}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Studiengruppe wählen"
                sx={{
                  bgcolor: "#fff",
                  borderRadius: 1.5,
                  "& .MuiInputBase-input": { color: "#004080", fontWeight: 600 },
                }}
              />
            )}
          />
        </Box>

        {/* Modul */}
        <Box>
          <Typography sx={{ fontWeight: 600, mb: 0.5, color: "#0d0d0dff" }}>
            Modul
          </Typography>
          <Autocomplete
            fullWidth
            options={MODULE}
            value={modul || ""}
            onChange={(_, val) => setModul(val || "")}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Modul wählen"
                sx={{
                  bgcolor: "#fff",
                  borderRadius: 1.5,
                  "& .MuiInputBase-input": { color: "#004080", fontWeight: 600 },
                }}
              />
            )}
          />
        </Box>

        {/* Raum */}
        <Box>
          <Typography sx={{ fontWeight: 600, mb: 0.5, color: "#0d0d0dff" }}>
            Raum
          </Typography>
          <Autocomplete
            fullWidth
            options={RAEUME}
            value={raum || ""}
            onChange={(_, val) => setRaum(val || "")}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Raum wählen"
                sx={{
                  bgcolor: "#fff",
                  borderRadius: 1.5,
                  "& .MuiInputBase-input": { color: "#004080", fontWeight: 600 },
                }}
              />
            )}
          />
        </Box>

        {/* Typ */}
        <Box>
          <Typography sx={{ fontWeight: 600, mb: 0.5, color: "#0d0d0dff" }}>
            Typ
          </Typography>
          <Autocomplete
            fullWidth
            options={TYPEN}
            value={typ || ""}
            onChange={(_, val) => setTyp(val || "")}
            renderOption={(props, option) => (
              <li {...props}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Box
                    sx={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      bgcolor: TYP_COLORS[option] || "#999",
                    }}
                  />
                  {option}
                </Box>
              </li>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Typ wählen"
                sx={{
                  bgcolor: "#fff",
                  borderRadius: 1.5,
                  "& .MuiInputBase-input": { color: "#004080", fontWeight: 600 },
                }}
              />
            )}
          />
        </Box>

        {/* Dozent */}
        <Box sx={{ gridColumn: "1 / -1" }}>
          <Typography sx={{ fontWeight: 600, mb: 0.5, color: "#0d0d0dff" }}>
            Dozent/-in
          </Typography>
          <Autocomplete
            fullWidth
            options={DOZENTEN}
            value={dozent || ""}
            onChange={(_, val) => setDozent(val || "")}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Dozent wählen"
                sx={{
                  bgcolor: "#fff",
                  borderRadius: 1.5,
                  "& .MuiInputBase-input": { color: "#004080", fontWeight: 600 },
                }}
              />
            )}
          />
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
    </Box>
  );
}







