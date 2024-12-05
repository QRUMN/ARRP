import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import getTheme from './theme';
import Navbar from './components/layout/Navbar';
import Home from './components/home/Home';
import Services from './components/services/Services';
import { ThemeModeProvider, useThemeMode } from './contexts/ThemeContext';

const ThemedApp = () => {
  const { darkMode } = useThemeMode();
  const theme = getTheme(darkMode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        minHeight: '100vh',
        bgcolor: 'background.default'
      }}>
        <Navbar />
        <Box component="main" sx={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
          </Routes>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

function App() {
  return (
    <ThemeModeProvider>
      <ThemedApp />
    </ThemeModeProvider>
  );
}

export default App;
