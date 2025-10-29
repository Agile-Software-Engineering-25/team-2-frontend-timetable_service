import { Box, FormControl, MenuItem, Select, TextField, Typography, InputAdornment } from '@mui/material';
import StudienGruppeDropdown from '@components/autoCompleteDropdown/studienGruppeDropdown.tsx';
import { DozentDropdown } from '@components/autoCompleteDropdown/dozentDropdown';
import { TYPEN } from '@components/autoCompleteDropdown/veranstaltungsTypDropdown';
import TYP_COLORS from './typColors';
import { RaumDropdown } from '@components/autoCompleteDropdown/raumDropdown';
import { useTranslation } from 'react-i18next';
import { ModulDropdown } from '@components/autoCompleteDropdown/modulDropdown';

interface Props {
  typ: string;
  setTyp: (val: string) => void;
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
  typ,
  setTyp,
  kommentar,
  setKommentar,
}: Props) {

  const { t } = useTranslation();

  return (
    <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
      {/* Studiengruppe */}
      <Box>
        <Typography id="label-studiengruppe" sx={{ fontWeight: 600, mb: 0.5, color: "#1A1A1A" }}>
          {t('pages.administrationform.studiengruppe')}
        </Typography>
        <FormControl fullWidth>
          <StudienGruppeDropdown/>
        </FormControl>
      </Box>

      {/* Modul */}
      <Box>
        <Typography id="label-modul"
                    sx={{ fontWeight: 600, mb: 0.5, color: "#1A1A1A" }}>
          {t('pages.administrationform.modul')}
        </Typography>
        <FormControl fullWidth>
          <ModulDropdown/>
        </FormControl>
      </Box>

      {/* Raum */}
      <Box>
        <Typography id="label-raum" sx={{ fontWeight: 600, mb: 0.5, color: "#1A1A1A" }}>
          {t('pages.administrationform.raum')}
        </Typography>
        <FormControl fullWidth>
          <RaumDropdown/>
        </FormControl>
      </Box>

      {/* Typ (Radio Buttons) */}
      <Box>
        <Typography sx={{ fontWeight: 600, mb: 0.5, color: "#1A1A1A" }}>
          {t('pages.administrationform.typ')}
        </Typography>
           <FormControl fullWidth>
             <Select id="select-typ" value={typ} onChange={(e) => setTyp(e.target.value)} sx={selectSx}>
               {TYPEN.map((typOpt) => (
                 <MenuItem key={typOpt} value={typOpt}>
                   <span aria-hidden="true" style={{
                     display: 'inline-block',
                     width: 16,
                     height: 16,
                     borderRadius: '50%',
                     background: TYP_COLORS[typOpt] || '#1976d2',
                     marginRight: 8,
                     verticalAlign: 'middle',
                   }} />
                   {typOpt}
                 </MenuItem>
               ))}
             </Select>
           </FormControl>
      </Box>

      {/* Dozent */}
      <Box sx={{ gridColumn: "1 / -1" }}>
        <Typography id="label-dozent" sx={{ fontWeight: 600, mb: 0.5, color: "#1A1A1A" }}>
          {t('pages.administrationform.dozent')}
        </Typography>
        <FormControl fullWidth>
          <DozentDropdown/>
        </FormControl>
      </Box>

      {/* Kommentar */}
      <Box sx={{ gridColumn: "1 / -1" }}>
        <Typography sx={{ fontWeight: 600, mb: 0.5, color: "#1A1A1A" }}>
          {t('pages.administrationform.kommentar')}
        </Typography>
        <TextField
          id="input-kommentar"
          aria-describedby="hint-kommentar"
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
                sx={{ alignSelf: "flex-end", mt: "auto", transform: "translateY(12px)" }}
              >
                <span
                  style={{
                    fontSize: "0.75rem",
                    color: (kommentar?.length || 0) >= 250 ? "red" : "#666",
                  }}
                >
                  {kommentar?.length || 0}/250
                </span>
              </InputAdornment>
            ),
          }}
          sx={{
            bgcolor: "#fff",
            borderRadius: 1.5,
            "& .MuiInputBase-input": { color: "#004080", fontWeight: 600 },
            "&:focus-within": { outline: "3px solid #FFBF47" }
          }}
        />
      </Box>
    </Box>
  );
}







