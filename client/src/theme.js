// theme.js
import { createTheme } from '@mui/material/styles';

export const getTheme = (mode) => createTheme({
  palette: {
    mode, // 'light' 또는 'dark'
    primary: {
      main: mode === 'light' ? '#1976d2' : '#90caf9',
    },
    background: {
      default: mode === 'light' ? '#fff' : '#121212',
      paper: mode === 'light' ? '#fff' : '#1d1d1d',
    },
  },
});
