import {
  createCustomMuiTheme,
  createCustomJoyTheme,
} from '@agile-software/shared-components';
declare module '@agile-software/shared-components' {
  export { createCustomMuiTheme, createCustomJoyTheme };
  export const createCustomTheme: (config: Record<string, unknown>) =>
    | { $$joy: Record<string, unknown> }
    | {
        cssVarPrefix?: string;
        colorSchemes: Record<string, Record<string, unknown>>;
      };
}
