import { Button } from '@mui/material';
import { useFormContext } from '@/contexts/FormContext.tsx';

export function ValidateInputButton() {
  const { validateForm } = useFormContext();

  const handleValidation = () => {
    // Aktuelle Werte ausgeben
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
