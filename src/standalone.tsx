import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "@stores/index";
import "./i18n";

const container = document.getElementById("root");

createRoot(container!).render(
  <StrictMode>
    <Provider store={store}>
      <App basename={import.meta.env.BASE_URL || "/"} />
    </Provider>
  </StrictMode>
);
