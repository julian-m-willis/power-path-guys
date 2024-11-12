'use client'; // Add this at the top if this layout is intended to run client-side

import '../globals.css';
import { FloatingDock } from '../../components/ui/floating-dock';
import { IconHome2, IconBarbell, IconTargetArrow, IconApple, IconMessages } from '@tabler/icons-react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Create a dark theme for MUI components
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#c1ff72', // Neon green primary color
    },
    secondary: {
      main: '#7B28FF', // Teal secondary color
    },
    background: {
      default: '#121212', // Main background color
      paper: '#262626', // Card/paper background color
    },
    text: {
      primary: '#ffffff', // Primary text color
      secondary: '#b0b0b0', // Secondary text color
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h5: {
      fontWeight: 700,
    },
    body1: {
      color: '#c1ff72', // Primary color for text highlights
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
          fontWeight: 600,
        },
        containedSecondary: {
          color: '#121212',
          '&:hover': {
            backgroundColor: '#c1ff72', // Darker shade for hover effect
          },
        },
      },
    },
  },
});

export default function RootLayout({ children }) {
  const items = [
    { title: 'Home', icon: <IconHome2 />, href: '/main' },
    { title: 'Workout', icon: <IconBarbell />, href: '/main/workout' },
    { title: 'Diet', icon: <IconApple />, href: '/main/diet' },
    { title: 'Forum', icon: <IconMessages />, href: '/main/blog' },
    { title: 'Goal', icon: <IconTargetArrow />, href: '/main/goal' },
  ];

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <main>
        {children}
        <FloatingDock
          items={items}
          desktopClassName="fixed bottom-4 left-1/2 transform -translate-x-1/2"
          mobileClassName="fixed bottom-4 left-1/2 transform -translate-x-1/2"
        />
      </main>
    </ThemeProvider>
  );
}
