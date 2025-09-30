import { Box, Button, ButtonGroup, Typography } from '@mui/material';

export default function CustomToolbar(props: any) {
  const { label, views, view, onNavigate, onView } = props;

  const goToBack = () => onNavigate('PREV');
  const goToNext = () => onNavigate('NEXT');

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Button
          variant="text"
          size="small"
          onClick={goToBack}
          sx={{ boxShadow: 'none', outline: 'none', fontWeight: 400, fontSize: '1.5rem', minWidth: 'auto' }}
        >
          &lt;
        </Button>
        <Typography sx={{ ml: 1, fontWeight: 700, fontSize: '1.15rem' }}>{label}</Typography>
        <Button
          variant="text"
          size="small"
          onClick={goToNext}
          sx={{ boxShadow: 'none', outline: 'none', fontWeight: 400, fontSize: '1.5rem', minWidth: 'auto' }}
        >
          &gt;
        </Button>
      </Box>

      <ButtonGroup variant="contained" size="small">
        {views && views.map((name: string) => (
          <Button
            key={name}
            onClick={() => onView(name)}
            color={view === name ? 'primary' : 'inherit'}
            sx={{ fontWeight: view === name ? 700 : 500 }}
          >
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </Button>
        ))}
      </ButtonGroup>
    </Box>
  );
}
