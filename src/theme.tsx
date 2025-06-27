import { createTheme } from "@mui/material/styles";
import "@fontsource/lato"; // Importa a fonte Lato


// Tema personalizado para o keekInteligencia
export const tema = createTheme({
  palette: {
    primary: {
      main: "#FF7A01", // Verde keekInteligencia
      light: "#5ba55e",
      dark: "#EE8552",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#f5f5f5", // Cinza claro para o fundo
      light: "#ffffff",
      dark: "#e0e0e0",
      contrastText: "#333333",
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
    text: {
      primary: "#333333",
      secondary: "#666666",
    },
  },
  typography: {
    fontFamily: "'Lato', 'Roboto', 'Helvetica', 'Arial', sans-serif", // Define Lato como padrão
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 500,
    },
    subtitle1: {
      fontWeight: 500,
    },
    button: {
      fontWeight: 500,
      textTransform: "none",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          textTransform: "none",
          fontWeight: 500,
        },
        containedPrimary: {
          "&:hover": {
            backgroundColor: "EE8552",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 4,
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: "#555555",
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.04)",
          },
        },
      },
    },
  },
});

export const bayeuxTheme = createTheme({
  palette: {
    primary: {
      main: "#0066cc",
    },
    background: {
      default: "#e3f2fd",
    },
  },
});

export const gugaPetTheme = createTheme({
  palette: {
    primary: {
      main: "#ff4081",
    },
    background: {
      default: "#fff0f6",
    },
  },
});

export const cmjpTheme = createTheme({
  palette: {
    primary: {
      main: "#388e3c",
    },
    background: {
      default: "#e8f5e9",
    },
  },
});

export const themeMap: Record<string, ReturnType<typeof createTheme>> = {
  "/bayeux": bayeuxTheme,
  "/guga-pet": gugaPetTheme,
  "/conecta-cmjp": cmjpTheme,
};