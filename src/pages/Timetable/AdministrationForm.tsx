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
  px: 1,
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
        <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
          Studiengruppe
        </Typography>
        <FormControl fullWidth>
          <Select value={studiengruppe} onChange={(e) => setStudiengruppe(e.target.value)} sx={selectSx}>
            <MenuItem value="BIN-T23-FI">BIN-T23-FI</MenuItem>
            <MenuItem value="BIN-T24-FI">BIN-T24-FI</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Modul */}
      <Box>
        <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
          Modul
        </Typography>
        <FormControl fullWidth>
          <Select value={modul} onChange={(e) => setModul(e.target.value)} sx={selectSx}>
            <MenuItem value="Agile Software Engineering">Agile Software Engineering</MenuItem>
            <MenuItem value="Mathematik">Mathematik</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Raum */}
      <Box>
        <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
          Raum
        </Typography>
        <FormControl fullWidth>
          <Select value={raum} onChange={(e) => setRaum(e.target.value)} sx={selectSx}>
            <MenuItem value="B835 / 1.34">B835 / 1.34</MenuItem>
            <MenuItem value="A101">A101</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Typ */}
      <Box>
        <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
          Typ
        </Typography>
        <FormControl fullWidth>
          <Select value={typ} onChange={(e) => setTyp(e.target.value)} sx={selectSx}>
            <MenuItem value="Präsenz Vorlesung">Präsenz Vorlesung</MenuItem>
            <MenuItem value="Online">Online</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Dozent (ganze Breite) */}
      <Box sx={{ gridColumn: "1 / -1" }}>
        <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
          Dozent/-in
        </Typography>
        <FormControl fullWidth>
          <Select value={dozent} onChange={(e) => setDozent(e.target.value)} sx={selectSx}>
            <MenuItem value="Gabriela Niezgodzka">Gabriela Niezgodzka</MenuItem>
            <MenuItem value="Max Mustermann">Max Mustermann</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Kommentar (ganze Breite) */}
      <Box sx={{ gridColumn: "1 / -1" }}>
        <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
          Veranstaltungskommentar
        </Typography>
        <TextField
          value={kommentar}
          onChange={(e) => setKommentar(e.target.value)}
          fullWidth
          multiline
          rows={3}
          sx={{
            bgcolor: "#fff",
            borderRadius: 1.5,
          }}
        />
      </Box>
    </Box>
  );
}




