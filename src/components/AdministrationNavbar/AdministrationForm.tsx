import { useState, useEffect } from "react";
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
  const { formState, updateField, validateForm, showErrors } = useFormContext();

  const [errors, setErrors] = useState<Record<string, string | null>>({
    studienGruppe: null,
    modul: null,
    raum: null,
    veranstaltungstyp: null,
    dozent: null,
  });

  // Wenn showErrors aktiv ist → sofortige Fehlermeldungsanzeige
  useEffect(() => {
    if (showErrors) {
      const { missingFields } = validateForm();
      const newErrors: Record<string, string | null> = {
        studienGruppe: missingFields.includes("Studiengruppe erforderlich")
          ? "Studiengruppe ist erforderlich"
          : null,
        modul: missingFields.includes("Modul erforderlich")
          ? "Modul ist erforderlich"
          : null,
        raum: missingFields.includes("Raum erforderlich")
          ? "Raum ist erforderlich"
          : null,
        veranstaltungstyp: missingFields.includes("Veranstaltungstyp erforderlich")
          ? "Typ ist erforderlich"
          : null,
        dozent: missingFields.includes("Dozent erforderlich")
          ? "Dozent ist erforderlich"
          : null,
      };
      setErrors(newErrors);
    }
  }, 
  [showErrors, formState]); // prüft erneut, wenn Fehler aktiviert oder Felder geändert werden

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
            <TextField
              {...params}
              placeholder="Studiengruppe wählen"
              size="small"
              sx={fieldSx}
              error={!!errors.studienGruppe && showErrors}
              required
            />
          )}
        />
        {showErrors && errors.studienGruppe && (
          <Typography sx={{ color: "red", fontSize: "0.75rem", mt: 0.3 }}>
            {errors.studienGruppe}
          </Typography>
        )}
      </Box>

      {/* Modul */}
      <Box>
        <Typography sx={{ fontWeight: 600, mb: 0.5, color: "#0d0d0d" }}>Modul</Typography>
        <Autocomplete
          options={MODULE ?? []}
          value={formState.modul || null}
          onChange={(_, val) => updateField("modul", val ?? null)}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Modul wählen"
              size="small"
              sx={fieldSx}
              error={!!errors.modul && showErrors}
              required
            />
          )}
        />
        {showErrors && errors.modul && (
          <Typography sx={{ color: "red", fontSize: "0.75rem", mt: 0.3 }}>
            {errors.modul}
          </Typography>
        )}
      </Box>

      {/* Raum */}
      <Box>
        <Typography sx={{ fontWeight: 600, mb: 0.5, color: "#0d0d0d" }}>Raum</Typography>
        <Autocomplete
          options={RAEUME ?? []}
          value={formState.raum || null}
          onChange={(_, val) => updateField("raum", val ?? null)}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Raum wählen"
              size="small"
              sx={fieldSx}
              error={!!errors.raum && showErrors}
              required
            />
          )}
        />
        {showErrors && errors.raum && (
          <Typography sx={{ color: "red", fontSize: "0.75rem", mt: 0.3 }}>
            {errors.raum}
          </Typography>
        )}
      </Box>

      {/* Typ */}
      <Box>
        <Typography sx={{ fontWeight: 600, mb: 0.5, color: "#0d0d0d" }}>Typ</Typography>
        <Autocomplete
          options={TYPEN ?? []}
          value={formState.veranstaltungstyp || null}
          onChange={(_, val) => updateField("veranstaltungstyp", val ?? null)}
          getOptionLabel={(option) => option || ""}
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
              error={!!errors.veranstaltungstyp && showErrors}
              required
              InputProps={{
               ...params.InputProps,
               startAdornment: formState.veranstaltungstyp ? (
                <Box
                  sx={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  bgcolor: (TYP_COLORS as any)[formState.veranstaltungstyp] || "#9aa",
                  ml: 0.5,
                  mr: 1,
                  }}
                 />
                ) : null,
              }}
            />
          )}
        />
        {showErrors && errors.veranstaltungstyp && (
          <Typography sx={{ color: "red", fontSize: "0.75rem", mt: 0.3 }}>
            {errors.veranstaltungstyp}
          </Typography>
        )}
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
              error={!!errors.dozent && showErrors}
              required
            />
          )}
        />
        {showErrors && errors.dozent && (
          <Typography sx={{ color: "red", fontSize: "0.75rem", mt: 0.3 }}>
            {errors.dozent}
          </Typography>
        )}
      </Box>

      {/* Kommentar (optional) */}
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








