import { Box, Button, ButtonGroup, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import { de, enUS } from 'date-fns/locale';

export default function CustomToolbar(props: any) {
  const { label, views, view, onNavigate, onView, date } = props;
  const { i18n } = useTranslation();

  // Dynamische Locale basierend auf aktueller Sprache
  const currentLocale =
    i18n.language === 'de' || i18n.language === 'de-DE' ? de : enUS;
  const formattedLabel = date
    ? format(date, 'MMMM yyyy', { locale: currentLocale })
    : label;

  // Übersetzungen für die View-Buttons
  const viewTranslations: Record<string, Record<string, string>> = {
    month: { de: 'Monat', en: 'Month' },
    week: { de: 'Woche', en: 'Week' },
    day: { de: 'Tag', en: 'Day' },
  };

  const getViewLabel = (viewName: string) => {
    const lang =
      i18n.language === 'de' || i18n.language === 'de-DE' ? 'de' : 'en';
    return (
      viewTranslations[viewName]?.[lang] ||
      viewName.charAt(0).toUpperCase() + viewName.slice(1)
    );
  };

  const goToBack = () => onNavigate('PREV');
  const goToNext = () => onNavigate('NEXT');

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        mb: 1,
      }}
      role="group"
      aria-label="Kalender-Navigation"
      color={'#002E6D'}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Button
          variant="text"
          size="small"
          onClick={goToBack}
          aria-label="Vorheriger Zeitraum"
          title="Vorheriger Zeitraum"
          sx={{
            color: '#002E6D',
            boxShadow: 'none',
            outline: 'none',
            fontWeight: 400,
            fontSize: '1.5rem',
            minWidth: 'auto',
            '&:focus-visible': {
              outline: '3px solid #FFBF47',
              outlineOffset: 2,
            },
          }}
        >
          &lt;
        </Button>
        <Typography
          id="calendar-period-label"
          aria-live="polite"
          component="h3"
          sx={{ ml: 1, fontWeight: 700, fontSize: '1.15rem' }}
        >
          {formattedLabel}
        </Typography>
        <Button
          variant="text"
          size="small"
          onClick={goToNext}
          aria-label="Nächster Zeitraum"
          title="Nächster Zeitraum"
          sx={{
            boxShadow: 'none',
            outline: 'none',
            fontWeight: 400,
            fontSize: '1.5rem',
            minWidth: 'auto',
            '&:focus-visible': {
              outline: '3px solid #FFBF47',
              outlineOffset: 2,
            },
          }}
        >
          &gt;
        </Button>
      </Box>

      <ButtonGroup
        variant="contained"
        size="small"
        role="group"
        aria-label="Ansicht wählen"
      >
        {views &&
          views.map((name: string) => (
            <Button
              key={name}
              onClick={() => onView(name)}
              color={view === name ? 'primary' : 'inherit'}
              aria-pressed={view === name}
              sx={{
                fontWeight: view === name ? 700 : 500,
                textTransform: 'none',
                color: view === name ? '#fff' : '#078BB9',
                backgroundColor: view === name ? '#078BB9' : '#fff',
                border: '1px solid #078BB9',
                '&:hover': {
                  backgroundColor: view === name ? '#06779E' : '#f0faff',
                },
                '&:focus-visible': {
                  outline: '3px solid #FFBF47',
                  outlineOffset: 2,
                },
              }}
            >
              {getViewLabel(name)}
            </Button>
          ))}
      </ButtonGroup>
    </Box>
  );
}
