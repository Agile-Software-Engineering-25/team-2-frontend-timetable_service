import { Provider } from "react-redux";
import store from "@stores/index";
import App from "./App";
import i18n from "./i18n";

export type MicrofrontendProps = {
  name?: string;
  basename?: string;
  initialLocale?: string;
  config?: Record<string, unknown>;
  domElement?: Element | null;
  [key: string]: unknown;
};

export default function Root(props: MicrofrontendProps) {
  const { basename, initialLocale } = props;
  if (initialLocale) {
    void i18n.changeLanguage(initialLocale);
  }

  return (
    <Provider store={store}>
      <App basename={basename} />
    </Provider>
  );
}
