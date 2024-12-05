import { createTheme } from '@mui/material/styles';

const getTheme = (darkMode) => createTheme({
  palette: {
    mode: darkMode ? 'dark' : 'light',
    primary: {
      main: '#2C5530', // Dark green
      light: '#3E7745',
      dark: '#1A331D',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#D4A373', // Muted orange/terra cotta
      light: '#E6B794',
      dark: '#B88B5E',
      contrastText: '#000000',
    },
    background: {
      default: darkMode ? '#121212' : '#FEFAE0', // Light beige in light mode
      paper: darkMode ? '#1e1e1e' : '#ffffff',
    },
    text: {
      primary: darkMode ? '#ffffff' : '#2C5530', // Dark green as primary text in light mode
      secondary: darkMode ? '#D4A373' : '#B88B5E', // Muted orange as secondary text
    },
    // Custom colors for specific components
    custom: {
      beige: '#FEFAE0',
      lightGreen: '#606C38',
      darkGreen: '#283618',
      terracotta: '#D4A373',
      darkTerracotta: '#B88B5E',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      color: '#2C5530', // Dark green
    },
    h2: {
      fontWeight: 600,
      color: '#2C5530',
    },
    h3: {
      fontWeight: 600,
      color: '#2C5530',
    },
    h4: {
      fontWeight: 600,
      color: '#2C5530',
    },
    h5: {
      fontWeight: 500,
      color: '#2C5530',
    },
    h6: {
      fontWeight: 500,
      color: '#2C5530',
    },
    subtitle1: {
      color: '#B88B5E', // Muted orange
    },
    subtitle2: {
      color: '#B88B5E',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: darkMode 
            ? '0px 4px 12px rgba(0, 0, 0, 0.3)' 
            : '0px 4px 12px rgba(0, 0, 0, 0.05)',
          backgroundColor: darkMode ? '#1e1e1e' : '#ffffff',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
          padding: '10px 24px',
        },
        contained: {
          boxShadow: darkMode 
            ? '0px 4px 12px rgba(0, 0, 0, 0.3)' 
            : '0px 4px 12px rgba(0, 0, 0, 0.1)',
          '&.MuiButton-containedPrimary': {
            backgroundColor: '#2C5530',
            '&:hover': {
              backgroundColor: '#3E7745',
            },
          },
          '&.MuiButton-containedSecondary': {
            backgroundColor: '#D4A373',
            color: '#000000',
            '&:hover': {
              backgroundColor: '#B88B5E',
            },
          },
        },
        outlined: {
          borderColor: darkMode ? '#D4A373' : '#2C5530',
          color: darkMode ? '#D4A373' : '#2C5530',
          '&:hover': {
            borderColor: darkMode ? '#B88B5E' : '#3E7745',
            backgroundColor: darkMode ? 'rgba(212, 163, 115, 0.1)' : 'rgba(44, 85, 48, 0.1)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: darkMode 
            ? 'rgba(18, 18, 18, 0.9)' 
            : 'rgba(254, 250, 224, 0.9)', // Semi-transparent beige in light mode
          backdropFilter: 'blur(20px)',
          boxShadow: 'none',
          borderBottom: darkMode 
            ? '1px solid rgba(212, 163, 115, 0.1)' 
            : '1px solid rgba(44, 85, 48, 0.1)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: darkMode ? '#121212' : '#FEFAE0',
          borderRight: darkMode 
            ? '1px solid rgba(212, 163, 115, 0.1)' 
            : '1px solid rgba(44, 85, 48, 0.1)',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: darkMode 
              ? 'rgba(212, 163, 115, 0.15)' 
              : 'rgba(44, 85, 48, 0.15)',
            '&:hover': {
              backgroundColor: darkMode 
                ? 'rgba(212, 163, 115, 0.25)' 
                : 'rgba(44, 85, 48, 0.25)',
            },
          },
        },
      },
    },
  },
});

export default getTheme;
