import { BrowserRouter } from "react-router";
import RoutingComponent from "@components/RoutingComponent/RoutingComponent";
import { createCustomTheme } from "@agile-software/shared-components";
import { THEME_ID as MATERIAL_THEME_ID, ThemeProvider } from "@mui/material";
import { CssVarsProvider as JoyCssVarsProvider } from "@mui/joy";

const theme = createCustomTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          500: "#your-primary-color",
        },
      },
    },
  },
  components: {},
});

function App() {
  return (
    <ThemeProvider theme={{ [MATERIAL_THEME_ID]: theme }}>
      <JoyCssVarsProvider>
        <BrowserRouter>
          <RoutingComponent />
        </BrowserRouter>
      </JoyCssVarsProvider>
    </ThemeProvider>
  );
}

export default App;
