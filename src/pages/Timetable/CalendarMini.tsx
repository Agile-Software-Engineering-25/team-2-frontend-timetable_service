import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { de, enUS } from 'date-fns/locale';
import { Box } from '@mui/material';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';

type Props = {
  date: Date | null;
  onChange: (d: Date | null) => void;
};

export default function CalendarMini({ date, onChange }: Props) {
  const { i18n } = useTranslation();

  // Dynamische Locale basierend auf aktueller Sprache
  const currentLocale =
    i18n.language === 'de' || i18n.language === 'de-DE' ? de : enUS;

  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      adapterLocale={currentLocale}
    >
      <Box
        sx={{
          bgcolor: '#eff4f9ff',
          borderRadius: 2,
          boxShadow: 1,
          p: 0.5,
          '& .MuiDateCalendar-root': {
            width: '100%',
            maxHeight: 240,
          },
          '& .MuiPickersCalendarHeader-label': {
            fontWeight: 'bold',
            fontSize: '1rem',
            textAlign: 'center',
            color: '#002E6D',
          },
          '& .MuiPickersArrowSwitcher-button': {
            color: '#002E6D',
          },
          '& .MuiDayCalendar-weekDayLabel': {
            fontWeight: 600,
            color: '#004080',
            textAlign: 'center',
            width: 'calc(100% / 7)',
            display: 'inline-block',
            margin: 0,
            padding: 0,
            lineHeight: 1,
            fontSize: '0.7rem',
          },
          '& .MuiDayCalendar-weekContainer': {
            marginTop: 0,
            paddingTop: 0,
          },
          '& .MuiPickersDay-root': {
            fontSize: '0.75rem',
            width: 'calc(100% / 7)',
            height: 28,
            margin: 0,
            fontStyle: 'normal',
            fontFamily: 'Arial, sans-serif',
            borderRadius: 2,
            color: '#002E6D',
          },
          '& .Mui-selected': {
            borderRadius: 2,
          },
        }}
      >
        <DateCalendar
          value={date}
          onChange={onChange}
          views={['day']}
          showDaysOutsideCurrentMonth
          dayOfWeekFormatter={(date) =>
            format(date, 'EE', { locale: currentLocale }).toUpperCase()
          }
        />
      </Box>
    </LocalizationProvider>
  );
}
