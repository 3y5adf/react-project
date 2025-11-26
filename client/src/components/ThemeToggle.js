import { IconButton } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useContext } from 'react';
import { ThemeModeContext } from './context/ThemeContext';

export default function ThemeToggleButton() {
  const { mode, toggleTheme } = useContext(ThemeModeContext);

  return (
    <IconButton onClick={toggleTheme} color="inherit">
      {mode === 'light' ? <Brightness4 /> : <Brightness7 />}
    </IconButton>
  );
}
