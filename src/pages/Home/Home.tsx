// Import von Material-UI Joy Komponenten für das Layout
import { Box, Typography, Stack, Card } from '@mui/joy';
// Import der Sprachauswahl-Komponente
import LanguageSelectorComponent from '@components/LanguageSelectorComponent/LanguageSelectorComponent';
// Import für Internationalisierung (i18n)
import { useTranslation } from 'react-i18next';
// Import für Navigation zwischen Seiten
import { useNavigate } from 'react-router';
// Import von Material-UI Icons
import { Schedule, Cloud, Api, Home as HomeIcon } from '@mui/icons-material';

/**
 * Home-Komponente - Hauptseite der Anwendung
 * Zeigt Navigationskarten zu verschiedenen Bereichen der App an
 */
const Home = () => {
  // Hook für Übersetzungen
  const { t } = useTranslation();
  // Hook für programmatische Navigation
  const navigate = useNavigate();

  // Konfiguration der Navigationskarten mit Pfaden, Icons und Farben
  const navigationButtons = [
    {
      label: t('pages.home.weatherButton'), // Übersetzter Text für Wetter-Button
      path: '/weather',
      icon: <Cloud />,
      color: 'primary' as const,
      description: 'Aktuelle Wetterinformationen anzeigen'
    },
    {
      label: 'API Test Page',
      path: '/apitest',
      icon: <Api />,
      color: 'neutral' as const,
      description: 'API-Funktionalitäten testen'
    },
    {
      label: 'Stundenplan',
      path: '/timetable',
      icon: <Schedule />,
      color: 'success' as const,
      description: 'Stundenplan verwalten'
    }
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 3
      }}
    >
      {/* Hauptkarte mit allen Inhalten */}
      <Card
        sx={{
          maxWidth: 900,
          width: '100%',
          padding: 4,
          borderRadius: 'lg',
          boxShadow: 'lg',
          backgroundColor: 'background.surface'
        }}
      >
        {/* Header-Bereich mit Icon, Titel und Beschreibung */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          {/* Home-Icon */}
          <HomeIcon sx={{ fontSize: 48, color: 'primary.500', mb: 2 }} />

          {/* Haupttitel mit Gradient-Effekt */}
          <Typography
            level="h1"
            sx={{
              mb: 1,
              background: 'linear-gradient(45deg, #667eea, #764ba2)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 'bold'
            }}
          >
            {t('pages.home.title')}
          </Typography>

          {/* Untertitel */}
          <Typography level="body-lg" sx={{ color: 'text.secondary' }}>
            Wählen Sie eine der folgenden Optionen
          </Typography>
        </Box>

        {/* Navigationsbereich - responsive Stack Layout */}
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={3}
          sx={{ mb: 4 }}
        >
          {/* Iteration über alle Navigationskarten */}
          {navigationButtons.map((button, index) => (
            <Card
              key={index}
              variant="outlined"
              sx={{
                flex: 1, // Gleichmäßige Verteilung der Breite
                cursor: 'pointer',
                transition: 'all 0.3s ease', // Sanfte Übergänge für Hover-Effekte
                '&:hover': {
                  transform: 'translateY(-4px)', // Lift-Effekt beim Hovern
                  boxShadow: 'lg',
                  borderColor: `${button.color}.500`
                }
              }}
              onClick={() => navigate(button.path)} // Navigation beim Klick
            >
              {/* Inhalt der Navigationskarte */}
              <Box sx={{ textAlign: 'center', p: 3 }}>
                {/* Icon mit entsprechender Farbe */}
                <Box sx={{ color: `${button.color}.500`, mb: 2 }}>
                  {button.icon}
                </Box>

                {/* Titel der Navigationsoption */}
                <Typography level="title-md" sx={{ mb: 1, fontWeight: 'bold' }}>
                  {button.label}
                </Typography>

                {/* Beschreibung der Funktionalität */}
                <Typography level="body-sm" sx={{ color: 'text.secondary' }}>
                  {button.description}
                </Typography>
              </Box>
            </Card>
          ))}
        </Stack>

        {/* Footer-Bereich mit Sprachauswahl */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Card variant="soft" sx={{ p: 2 }}>
            <LanguageSelectorComponent />
          </Card>
        </Box>
      </Card>
    </Box>
  );
};

export default Home;

