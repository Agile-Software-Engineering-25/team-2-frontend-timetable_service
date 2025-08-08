import { BrowserRouter } from "react-router";
import RoutingComponent from "@components/RoutingComponent/RoutingComponent";
import { createCustomTheme } from "@agile-software/shared-components";
import { CssVarsProvider } from "@mui/joy";

const customTheme = createCustomTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          500: "#your-primary-color",
        },
      },
    },
  },
  components: {
    JoyButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
        },
      },
    },
  },
});

type AppProps = {
  basename?: string;
};

function App({ basename }: AppProps) {
  return (
    // @ts-expect-error External shared theme type is compatible at runtime
    <CssVarsProvider theme={customTheme}>
      <BrowserRouter basename={basename}>
        <RoutingComponent />
      </BrowserRouter>
    </CssVarsProvider>
  );
}

export default App;
