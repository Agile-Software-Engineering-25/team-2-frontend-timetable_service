import { Button } from '@mui/material';
import { useFormContext } from '@/contexts/FormContext.tsx';

export function ValidateInputButton() {
  const { validateForm, formState } = useFormContext();

  const handleValidation = () => {
    // Aktuelle Werte ausgeben
    console.log('Studiengruppe:', formState.studienGruppe);
    console.log('Modul:', formState.modul);
    console.log('Dozent:', formState.dozent);
    console.log('Veranstaltungstyp:', formState.veranstaltungstyp);
    console.log('Raum:', formState.raum);

    const validation = validateForm();

    if (validation.isValid) {
      alert(
        'Alle Felder sind ausgefüllt! Die Veranstaltung kann gebucht werden.'
      );
      // Hier können Sie weitere Aktionen ausführen, z.B. API-Call
    } else {
      alert(
        `Bitte füllen Sie folgende Felder aus: ${validation.missingFields.join(', ')}`
      );
    }
  };

  return <Button onClick={handleValidation}>Veranstaltung Buchen</Button>;
}
