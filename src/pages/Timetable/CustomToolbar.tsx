import { Box, Button, ButtonGroup, Typography } from '@mui/material';

export default function CustomToolbar(props: any) {
  const { label, views, view, onNavigate, onView } = props;

  const goToBack = () => onNavigate('PREV');
  const goToNext = () => onNavigate('NEXT');

  return (
    <Box
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}
      role="group"
      aria-label="Kalender-Navigation"
      color={"#002E6D"}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Button
          variant="text"
          size="small"
          onClick={goToBack}
          aria-label="Vorheriger Zeitraum"
          title="Vorheriger Zeitraum"
          sx={{
            color: "#002E6D",
            boxShadow: 'none',
            outline: 'none',
            fontWeight: 400,
            fontSize: '1.5rem',
            minWidth: 'auto',
            '&:focus-visible': { outline: '3px solid #FFBF47', outlineOffset: 2 }
          }}
        >
          &lt;
          </Button>
          <Typography
              id="calendar-period-label"
              aria-live="polite"
              component="h3"
              sx={{ ml: 1, fontWeight: 700, fontSize: '1.15rem'
            }}
          >
          {label}
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
            '&:focus-visible': { outline: '3px solid #FFBF47', outlineOffset: 2 }
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
        {views && views.map((name: string) => (
          <Button
            key={name}
            onClick={() => onView(name)}
            color={view === name ? 'primary' : 'inherit'}
            aria-pressed={view === name}
            sx={{
              fontWeight: view === name ? 700 : 500,
              '&:focus-visible': { outline: '3px solid #FFBF47', outlineOffset: 2 }
            }}
          >
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </Button>
        ))}
      </ButtonGroup>
    </Box>
  );
}
