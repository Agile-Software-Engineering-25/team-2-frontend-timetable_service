import { Box, Typography, TextField, InputAdornment, Autocomplete } from "@mui/material";
import { useFormContext } from "../../contexts/FormContext.tsx";
import { StudienGruppen } from "../../components/autoCompleteDropdown/studienGruppeDropdown";
import { MODULE } from "../../components/autoCompleteDropdown/modulDropdown";
import { DOZENTEN } from "../../components/autoCompleteDropdown/dozentDropdown";
import { TYPEN } from "../../components/autoCompleteDropdown/veranstaltungsTypDropdown";
import { RAEUME } from "../../components/autoCompleteDropdown/raumDropdown";
import TYP_COLORS from "./typColors";

const fieldSx = {
  bgcolor: "#fff",
  borderRadius: 1.5,
  "& .MuiOutlinedInput-root": {
    padding: "0 10px",
    height: 40,
  },
  "& .MuiInputBase-input": {
    color: "#0A2E65",
    fontWeight: 700,
    fontSize: "0.95rem",
    padding: "8px 0",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "transparent",
  },
  boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
};

export default function AdministrationForm() {
  const { formState, updateField } = useFormContext();

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
        gap: 2,
      }}
    >
      {/* Studiengruppe */}
      <Box>
        <Typography sx={{ fontWeight: 600, mb: 0.5, color: "#0d0d0d" }}>Studiengruppe</Typography>
        <Autocomplete
          options={StudienGruppen ?? []}
          value={formState.studienGruppe || null}
          onChange={(_, val) => updateField("studienGruppe", val ?? null)}
          renderInput={(params) => (
            <TextField {...params} placeholder="Studiengruppe wählen" size="small" sx={fieldSx} required/>
          )}
        />
      </Box>

      {/* Modul */}
      <Box>
        <Typography sx={{ fontWeight: 600, mb: 0.5, color: "#0d0d0d" }}>Modul</Typography>
        <Autocomplete
          options={MODULE ?? []}
          value={formState.modul || null}
          onChange={(_, val) => updateField("modul", val ?? null)}
          renderInput={(params) => (
            <TextField {...params} placeholder="Modul wählen" size="small" sx={fieldSx} required/>
          )}
        />
      </Box>

      {/* Raum */}
      <Box>
        <Typography sx={{ fontWeight: 600, mb: 0.5, color: "#0d0d0d" }}>Raum</Typography>
        <Autocomplete
          options={RAEUME ?? []}
          value={formState.raum || null}
          onChange={(_, val) => updateField("raum", val ?? null)}
          renderInput={(params) => (
            <TextField {...params} placeholder="Raum wählen" size="small" sx={fieldSx} required/>
          )}
        />
      </Box>

      {/* Typ */}
      <Box>
        <Typography sx={{ fontWeight: 600, mb: 0.5, color: "#0d0d0d" }}>Typ</Typography>
        <Autocomplete
          options={TYPEN ?? []}
          value={formState.veranstaltungstyp || null}
          onChange={(_, val) => updateField("veranstaltungstyp", val ?? null)}
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
            <TextField {...params} placeholder="Typ wählen" size="small" sx={fieldSx} required/>
          )}
        />
      </Box>

      {/* Dozent */}
      <Box sx={{ gridColumn: "1 / -1" }}>
        <Typography sx={{ fontWeight: 600, mb: 0.5, color: "#0d0d0d" }}>Dozent/-in</Typography>
        <Autocomplete
          options={DOZENTEN ?? []}
          value={formState.dozent || null}
          onChange={(_, val) => updateField("dozent", val ?? null)}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Dozent wählen"
              size="small"
              sx={{
                ...fieldSx,
                "& .MuiOutlinedInput-root": {
                  height: 44,
                  borderRadius: 1.5,
                  "& fieldset": { borderColor: "transparent" },
                  "&.Mui-focused fieldset": {
                    borderColor: "#0A2E65",
                    borderWidth: "2px",
                  },
                },
              }}
            required/>
          )}
        />
      </Box>

      {/* Kommentar */}
      <Box sx={{ gridColumn: "1 / -1" }}>
        <Typography sx={{ fontWeight: 600, mb: 0.5, color: "#0d0d0d" }}>
          Veranstaltungskommentar (optional)
        </Typography>
        <TextField
          value={formState.kommentar || ""}
          onChange={(e) => updateField("kommentar", e.target.value)}
          fullWidth
          multiline
          rows={3}
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
                    color: (formState.kommentar?.length || 0) >= 250 ? "red" : "#666",
                  }}
                >
                  {formState.kommentar?.length || 0}/250
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








