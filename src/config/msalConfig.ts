import { LogLevel } from "@azure/msal-browser";

export const msalConfig = {
  auth: {
    clientId: "5f9f0600-0b59-4b72-ad1c-3a611a94bc01",
    authority: "https://login.microsoftonline.com/c4b5766e-d2cc-4d9a-a521-831733468571",
    redirectUri: "https://localhost:7258/Auth/Signin-oidc",
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level:any, message:any, containsPii:any) => {
        if (containsPii) return;
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
        }
      },
    },
  },
};

export const loginRequest = {
  scopes: ["User.Read"],
};

export const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
};
