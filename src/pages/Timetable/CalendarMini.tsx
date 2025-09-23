// CalendarMini.tsx
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { de } from "date-fns/locale";
import { Box } from "@mui/material";

type Props = {
  date: Date | null;
  onChange: (d: Date | null) => void;
};

export default function CalendarMini({ date, onChange }: Props) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={de}>
      <Box
        sx={{
          bgcolor: "#eff4f9ff", // hellblauer Hintergrund wie im Screenshot
          borderRadius: 2,
          boxShadow: 1,
          p: 1,
          "& .MuiDateCalendar-root": {
            width: "100%",
            maxHeight: 280,
          },
          "& .MuiPickersCalendarHeader-root": {
            justifyContent: "space-between",
            px: 2,
            pt: 1,
            pb: 0.5,
          },
          "& .MuiPickersCalendarHeader-label": {
            fontWeight: "bold",
            fontSize: "1.1rem",
          },
          "& .MuiPickersDay-root": {
            fontSize: "0.8rem",
            width: 34,
            height: 34,
          },
        }}
      >
        <DateCalendar
          value={date}
          onChange={onChange}
          views={["day"]}
          showDaysOutsideCurrentMonth
        />
      </Box>
    </LocalizationProvider>
  );
}




