import { createTheme, ThemeProvider } from "../adapters";


const theme = createTheme({
  palette: {
    primary: {
      main: '#0066CC',
    },
    secondary: {
      main: '#b23800',
    },
  },
  typography: {
    fontFamily: 'Athos, Arial, sans-serif',
  },  
});

export { theme, ThemeProvider };

