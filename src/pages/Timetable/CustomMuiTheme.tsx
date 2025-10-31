import { createTheme } from "@mui/material/styles";

const customMuiTheme = createTheme({
  typography: {
    fontFamily: "'Poppins', sans-serif",
    h1: { fontSize: "64px", fontWeight: 500 }, // Medium
    h2: { fontSize: "36px", fontWeight: 600 }, // SemiBold
    h3: { fontSize: "32px", fontWeight: 600 }, // SemiBold
    h4: { fontSize: "24px", fontWeight: 300 }, // Light
    body1: { fontSize: "16px", fontWeight: 300 }, // Light
    button: {
      textTransform: "none",
      fontWeight: 600, // SemiBold
      fontSize: "14px",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        sizeLarge: {
          fontSize: "16px",
          fontWeight: 600,
        },
      },
    },
  },
});

export default customMuiTheme;
