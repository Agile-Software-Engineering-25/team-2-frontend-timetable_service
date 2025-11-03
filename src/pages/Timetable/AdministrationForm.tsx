import {
  Box,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import StudienGruppeDropdown from '@components/autoCompleteDropdown/studienGruppeDropdown.tsx';
import { DozentDropdown } from '@components/autoCompleteDropdown/dozentDropdown';
import { TYPEN } from '@components/autoCompleteDropdown/veranstaltungsTypDropdown';
import TYP_COLORS from './typColors';
import { RaumDropdown } from '@components/autoCompleteDropdown/raumDropdown';
import { useTranslation } from 'react-i18next';
import { ModulDropdown } from '@components/autoCompleteDropdown/modulDropdown';
import { useFormContext } from '@/contexts/FormContext.tsx';

interface Props {
  typ: string;
  setTyp: (val: string) => void;
  kommentar: string;
  setKommentar: (val: string) => void;
  isAdmin: boolean;
  isTeacher: boolean;
}

const selectSx = {
  backgroundColor: '#fff',
  borderColor: '#078BB9',
  borderRadius: 1.5,
  height: '100%',
  px: 1.5,
  fontWeight: 600,
  color: '#004080',
  '& .MuiSelect-icon': { color: '#004080' },
};

export default function AdministrationForm({
  typ,
  setTyp,
  kommentar,
  setKommentar,
  isAdmin,
  isTeacher,
}: Props) {
  const { t } = useTranslation();
  const { updateField } = useFormContext();

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 2,
        itemsAlign: 'stretch',
      }}
    >
      {/* Studiengruppe */}
      {(isAdmin || isTeacher) && (
        <Box>
          <Typography
            id="label-studiengruppe"
            sx={{ fontWeight: 600, mb: 0.5, color: '#004080' }}
          >
            {t('pages.administrationform.studiengruppe')}
          </Typography>
          <FormControl fullWidth>
            <StudienGruppeDropdown isAdmin={isAdmin} isTeacher={isTeacher} />
          </FormControl>
        </Box>
      )}

      {/* Modul */}
      {(isAdmin || isTeacher) && (
        <Box>
          <Typography
            id="label-modul"
            sx={{ fontWeight: 600, mb: 0.5, color: '#004080' }}
          >
            {t('pages.administrationform.modul')}
          </Typography>
          <FormControl fullWidth>
            <ModulDropdown isAdmin={isAdmin} isTeacher={isTeacher} />
          </FormControl>
        </Box>
      )}

      {/* Raum */}
      {(isAdmin || isTeacher) && (
        <Box>
          <Typography
            id="label-raum"
            sx={{ fontWeight: 600, mb: 0.5, color: '#004080' }}
          >
            {t('pages.administrationform.raum')}
          </Typography>
          <FormControl fullWidth>
            <RaumDropdown isAdmin={isAdmin} isTeacher={isTeacher} />
          </FormControl>
        </Box>
      )}

      {/* Typ (Radio Buttons) */}
      {(isAdmin || isTeacher) && (
        <Box>
          <Typography sx={{ fontWeight: 600, mb: 0.5, color: '#004080' }}>
            {t('pages.administrationform.typ')}
          </Typography>
          <FormControl fullWidth>
            <Select
              disabled={isTeacher && !isAdmin}
              id="select-typ"
              value={typ}
              onChange={(e) => {
                setTyp(e.target.value);
                updateField('veranstaltungstyp', e.target.value);
              }}
              sx={selectSx}
            >
              {TYPEN.map((typOpt) => (
                <MenuItem key={typOpt} value={typOpt}>
                  <span
                    aria-hidden="true"
                    style={{
                      display: 'inline-block',
                      width: 16,
                      height: 16,
                      borderRadius: '50%',
                      backgroundColor: '#E3F2FD',
                      background: TYP_COLORS[typOpt] || '#1976d2',
                      marginRight: 8,
                      verticalAlign: 'middle',
                      padding: 0,
                    }}
                  />
                  {typOpt}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      )}

      {/* Dozent */}
      {(isAdmin || isTeacher) && (
        <Box sx={{ gridColumn: '1 / -1' }}>
          <Typography
            id="label-dozent"
            sx={{ fontWeight: 600, mb: 0.5, color: '#004080' }}
          >
            {t('pages.administrationform.dozent')}
          </Typography>
          <FormControl fullWidth>
            <DozentDropdown isAdmin={isAdmin} isTeacher={isTeacher} />
          </FormControl>
        </Box>
      )}

      {/* Kommentar */}
      {(isAdmin || isTeacher) && (
        <Box sx={{ gridColumn: '1 / -1' }}>
          <Typography sx={{ fontWeight: 600, mb: 0.5, color: '#004080' }}>
            {t('pages.administrationform.kommentar')}
          </Typography>
          <TextField
            id="input-kommentar"
            aria-describedby="hint-kommentar"
            value={kommentar}
            onChange={(e) => {
              setKommentar(e.target.value);
              updateField('kommentar', e.target.value || null);
            }}
            fullWidth
            multiline
            rows={2}
            placeholder="Bitte Spaß mitbringen"
            sx={{
              bgcolor: '#fff',
              borderRadius: 1.5,
              '& .MuiInputBase-input': { color: '#004080', fontWeight: 600 },
              '&:focus-within': { outline: '3px solid #FFBF47' },
            }}
          />
        </Box>
      )}
    </Box>
  );
}
