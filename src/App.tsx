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

function App() {
  return (
    <CssVarsProvider theme={customTheme}>
      <BrowserRouter>
        <RoutingComponent />
      </BrowserRouter>
    </CssVarsProvider>
  );
}

export default App;
