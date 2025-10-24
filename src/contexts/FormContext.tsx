import React, { createContext, useContext, useState, type ReactNode } from 'react';
import type { Lecturer } from '@components/autoCompleteDropdown/dozentDropdown.tsx';
import type { Module } from '@components/autoCompleteDropdown/modulDropdown.tsx';
import type { AutocompleteValue } from '@mui/material';
import type { Room } from '@components/autoCompleteDropdown/raumDropdown.tsx';
import type { Group } from '@components/autoCompleteDropdown/studienGruppeDropdown.tsx';

/**
 * Interface für den Zustand des Formulars
 * Definiert alle verfügbaren Felder für die Veranstaltungsbuchung
 */
interface FormState {
  /** Ausgewählte Studiengruppe (z.B. "BIN-T-23-F1") */
  studienGruppe: Group | null;
  /** Ausgewähltes Modul (z.B. "Agile Software Engineering") */
  modul: Module | null;
  /** Ausgewählter Dozent (z.B. "Folk, Florian") */
  dozent: Lecturer | null;
  /** Ausgewählter Veranstaltungstyp (z.B. "Kurs", "Prüfung") */
  veranstaltungstyp: string | null;
  /** Ausgewählter Raum (z.B. "R101") */
  raum: Room | null;
}

/**
 * Interface für den FormContext
 * Definiert alle verfügbaren Funktionen und den State
 */
interface FormContextType {
  /** Aktueller Zustand des Formulars */
  formState: FormState;
  /** Funktion zum Aktualisieren einzelner Formularfelder */
  updateField: (field: keyof FormState, value: AutocompleteValue<unknown, false, false, false>) => void;
  /** Funktion zur Validierung des gesamten Formulars */
  validateForm: () => { isValid: boolean; missingFields: string[] };
}

/**
 * React Context für das zentrale Formular-State-Management
 * Ermöglicht es allen Child-Komponenten, auf den Formular-State zuzugreifen
 */
const FormContext = createContext<FormContextType | undefined>(undefined);

/**
 * Custom Hook zum Zugriff auf den FormContext
 *
 * @returns FormContextType - Objekt mit formState, updateField und validateForm
 * @throws Error - Falls der Hook außerhalb eines FormProviders verwendet wird
 *
 * @example
 * ```tsx
 * const { formState, updateField, validateForm } = useFormContext();
 *
 * // Feld aktualisieren
 * updateField('dozent', 'Folk, Florian');
 *
 * // Formular validieren
 * const validation = validateForm();
 * if (!validation.isValid) {
 *   console.log('Fehlende Felder:', validation.missingFields);
 * }
 * ```
 */
export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};

/**
 * Props für den FormProvider
 */
interface FormProviderProps {
  /** Child-Komponenten, die Zugriff auf den FormContext haben sollen */
  children: ReactNode;
}

/**
 * FormProvider Komponente - Stellt den FormContext für alle Child-Komponenten bereit
 *
 * Verwaltet den zentralen State für das Veranstaltungsbuchungsformular und stellt
 * Funktionen zum Aktualisieren und Validieren der Formulardaten bereit.
 *
 * @param props - FormProviderProps mit children
 *
 * @example
 * ```tsx
 * <FormProvider>
 *   <DozentDropdown />
 *   <StudienGruppeDropdown />
 *   <ModulDropdown />
 *   <VeranstaltungstypDropdown />
 *   <ValidateInputButton />
 * </FormProvider>
 * ```
 */
export const FormProvider: React.FC<FormProviderProps> = ({ children }) => {
  // Zentraler State für alle Formularfelder
  const [formState, setFormState] = useState<FormState>({
    studienGruppe: null,
    modul: null,
    dozent: null,
    veranstaltungstyp: null,
    raum: null,
  });

  /**
   * Aktualisiert ein einzelnes Feld im Formular-State
   *
   * @param field - Der Schlüssel des zu aktualisierenden Feldes
   * @param value - Der neue Wert für das Feld (null zum Zurücksetzen)
   *
   * @example
   * ```tsx
   * // Dozent setzen
   * updateField('dozent', 'Folk, Florian');
   *
   * // Feld zurücksetzen
   * updateField('modul', null);
   * ```
   */
  const updateField = (field: keyof FormState, value: any ) => {
    setFormState(prev => ({
      ...prev,
      [field]: value
    }));
  };

  /**
   * Validiert das gesamte Formular und gibt den Validierungsstatus zurück
   *
   * Überprüft alle erforderlichen Felder (studienGruppe, modul, dozent, veranstaltungstyp)
   * und erstellt eine Liste der fehlenden Felder.
   *
   * @returns Objekt mit isValid (boolean) und missingFields (string[])
   *
   * @example
   * ```tsx
   * const validation = validateForm();
   *
   * if (validation.isValid) {
   *   console.log('Formular ist vollständig ausgefüllt');
   * } else {
   *   console.log('Fehlende Felder:', validation.missingFields);
   *   // Ausgabe z.B.: ['Studiengruppe', 'Dozent']
   * }
   * ```
   */
  const validateForm = () => {
    const missingFields: string[] = [];

    if (!formState.studienGruppe) missingFields.push('Studiengruppe');
    if (!formState.modul) missingFields.push('Modul');
    if (!formState.dozent) missingFields.push('Dozent');
    if (!formState.veranstaltungstyp) missingFields.push('Veranstaltungstyp');
    if (!formState.raum) missingFields.push('Raum');

    return {
      isValid: missingFields.length === 0,
      missingFields
    };
  };

  return (
    <FormContext.Provider value={{ formState, updateField, validateForm }}>
      {children}
    </FormContext.Provider>
  );
};
