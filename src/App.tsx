import { BrowserRouter } from "react-router-dom";
import RoutingComponent from "@components/RoutingComponent/RoutingComponent";
import { createCustomJoyTheme, createCustomMuiTheme } from "@agile-software/shared-components";
import { THEME_ID as MATERIAL_THEME_ID, ThemeProvider } from "@mui/material";
import { CssVarsProvider as JoyCssVarsProvider } from "@mui/joy";
import "./i18n";
import { Provider } from "react-redux";
import store from "@stores/index.ts";

const muiTheme = createCustomMuiTheme();
const joyTheme = createCustomJoyTheme();

type AppProps = {
  basename?: string;
};

function App({ basename }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={{ [MATERIAL_THEME_ID]: muiTheme }}>
        <JoyCssVarsProvider theme={joyTheme}>
          <BrowserRouter basename={basename}>
            <RoutingComponent />
          </BrowserRouter>
        </JoyCssVarsProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
