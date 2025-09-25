import {
  createCustomJoyTheme,
  createCustomMuiTheme,
} from "@agile-software/shared-components";
import { CssVarsProvider as JoyCssVarsProvider } from "@mui/joy/styles";
import { ThemeProvider } from "@mui/material/styles";
import { Card } from "@agile-software/shared-components/dist";

const joyTheme = createCustomJoyTheme();
const muiTheme = createCustomMuiTheme();

function App() {
  return (
    <ThemeProvider theme={muiTheme}>
      <JoyCssVarsProvider
        theme={joyTheme}
        defaultMode="light"
        modeStorageKey="joy-mode"
        colorSchemeStorageKey="joy-color-scheme"
      >
        {/* Your app content */}
        <Card>
          <h1>Hello, Microfrontend!</h1>
        </Card>
      </JoyCssVarsProvider>
    </ThemeProvider>
  );
}

export default App;
