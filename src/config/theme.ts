import { createTheme, ThemeProvider } from "../adapters";


const theme = createTheme({
  palette: {
    primary: {
      main: '#00b7bd',
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

