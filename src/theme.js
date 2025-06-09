import { createTheme } from '@mui/material/styles';

const getTheme = (lang) => createTheme({
  palette: {
    primary: {
      main: '#2C3E50', // Deep blue-gray
      light: '#34495E',
      dark: '#1A252F',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#E74C3C', // Vibrant red
      light: '#FF6B6B',
      dark: '#C0392B',
      contrastText: '#ffffff',
    },
    background: {
      default: '#1A1A2E', // 
      dark: '#16213E', // Darker navy
      paper: '#F5F5F5', // light gray
    },
    text: {
      primary: '#233142', // Light gray-white
      secondary: '#94A3B8', // Muted gray
    },
    error: {
      main: '#EF4444', // Red
      light: '#F87171',
      dark: '#DC2626',
    },
    warning: {
      main: '#F59E0B', // Amber
      light: '#FBBF24',
      dark: '#D97706',
    },
    success: {
      main: '#10B981', // Green
      light: '#34D399',
      dark: '#059669',
    },
    info: {
      main: '#3B82F6', // Blue
      light: '#60A5FA',
      dark: '#2563EB',
    },
  },
  typography: {
    fontFamily: lang === "ar" ? `'Cairo', sans-serif` : `'Lexend', sans-serif`,
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.75rem',
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
    },
    h5: {
      fontWeight: 500,
      fontSize: '1.25rem',
    },
    h6: {
      fontWeight: 500,
      fontSize: '1rem',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },



});

export default getTheme;