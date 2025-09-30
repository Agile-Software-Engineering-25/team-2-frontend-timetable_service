import { Box, Typography, FormControl, Select, MenuItem, TextField } from "@mui/material";

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
            <MenuItem value="BIN-T23-FI">BIN-T23-FI</MenuItem>
            <MenuItem value="BIN-T24-FI">BIN-T24-FI</MenuItem>
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
            <MenuItem value="Agile Software Engineering">
              Agile Software Engineering
            </MenuItem>
            <MenuItem value="Mathematik">Mathematik</MenuItem>
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
            <MenuItem value="B835 / 1.34">B835 / 1.34</MenuItem>
            <MenuItem value="A101">A101</MenuItem>
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
            <MenuItem value="Präsenz Vorlesung">Präsenz Vorlesung</MenuItem>
            <MenuItem value="Online">Online</MenuItem>
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
            <MenuItem value="Gabriela Niezgodzka">
              Gabriela Niezgodzka
            </MenuItem>
            <MenuItem value="Max Mustermann">Max Mustermann</MenuItem>
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







