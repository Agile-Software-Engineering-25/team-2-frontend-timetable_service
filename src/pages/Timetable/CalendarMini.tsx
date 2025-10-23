import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { de } from "date-fns/locale";
import { Box } from "@mui/material";
import { format } from "date-fns";

type Props = {
  date: Date | null;
  onChange: (d: Date | null) => void;
};

export default function CalendarMini({ date, onChange }: Props) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={de}>
   <Box
     role="region"
     aria-label="Mini-Kalender"
     aria-live="polite"
  sx={{
    bgcolor: "#eff4f9ff",
    borderRadius: 2,
    boxShadow: 1,
    p: 0.5,
    "& .MuiDateCalendar-root": {
      width: "100%",
      maxHeight: 240,
    },
    "& .MuiPickersCalendarHeader-label": {
      fontWeight: "bold",
      fontSize: "1rem",
      textAlign: "center",
    },
    "& .MuiDayCalendar-weekDayLabel": {
      fontWeight: 600,
      color: "#004080",
      textAlign: "center",
      width: "calc(100% / 7)",
      display: "inline-block",
      margin: 0,
      padding: 0,
      lineHeight: 1,
      fontSize: "0.7rem",
    },
    "& .MuiDayCalendar-weekContainer": {
      marginTop: 0,
      paddingTop: 0,
    },
    "& .MuiPickersDay-root": {
      fontSize: "0.5rem",
      width: "calc(100% / 7)",
      margin: 0,
      fontStyle: "normal",
      fontFamily: "Arial, sans-serif",
    },
    "& .MuiPickersDay-root:focus-visible": {
      outline: "3px solid #FFBF47",
      outlineOffset: 2,
    },
    "& .MuiPickersDay-root.Mui-selected": {
      backgroundColor: "#0A2E65",
      color: "#fff",
    },
    "& .MuiPickersDay-root.Mui-selected:hover": {
      backgroundColor: "#072241",
    },
  }}
>

        <DateCalendar
          value={date}
          onChange={onChange}
          views={["day"]}
          showDaysOutsideCurrentMonth
          reduceAnimations
          aria-label="Datum wählen"
          dayOfWeekFormatter={(date) =>
            format(date, "EE", { locale: de }).toUpperCase()
          }
        />
      </Box>
    </LocalizationProvider>
  );
}



