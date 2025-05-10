import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { registerSW } from "virtual:pwa-register";
import { CssBaseline } from "./adapters/MuiAdapter.ts";
import {
  BrowserRouter,
  createRoot,
  StrictMode,
} from "./adapters/ReactAdapter.ts";
import App from "./App.tsx";
import { msalConfig } from "./config/msalConfig.ts";
import "./config/sweetAlertStyles.css";
import { theme, ThemeProvider } from "./config/theme.ts";
import { UserProvider } from "./providers/UserContextProvider.tsx";

registerSW({
  onNeedRefresh() {},
  onOfflineReady() {},
});

const msalInstance = new PublicClientApplication(msalConfig);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MsalProvider instance={msalInstance}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <UserProvider>
            <App />
          </UserProvider>
        </BrowserRouter>
      </ThemeProvider>
    </MsalProvider>
  </StrictMode>
);
