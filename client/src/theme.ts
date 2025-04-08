// theme.ts
import { createTheme, lightThemePrimitives } from 'baseui';

const primitives = {
  ...lightThemePrimitives,
  primaryFontFamily: 'Proza Libre, sans-serif',
  primary: '#6cac8f',
  accent: '#898fbd',
};

export const customTheme = createTheme({
  ...primitives,
  colors: {
    // Semantic background & content roles
    backgroundPrimary: '#f9fbfb',
    backgroundSecondary: '#ffffff',
    backgroundTertiary: '#f0f2f2',

    contentPrimary: '#09110e',
    contentSecondary: '#3c4a46',
    contentTertiary: '#6e7d76',
    contentInversePrimary: '#ffffff',
    contentInverseSecondary: '#f9fbfb',

    // Borders
    borderSelected: primitives.primary,
    borderFocus: primitives.accent,

    // Buttons
    buttonPrimaryFill: primitives.primary,
    buttonPrimaryText: '#ffffff',
    buttonPrimaryHover: '#5e9c7f',
    buttonPrimaryActive: '#4c866d',

    buttonSecondaryFill: '#ffffff',
    buttonSecondaryText: primitives.primary,
    buttonSecondaryHover: '#f0f2f2',
    buttonSecondaryActive: '#e2e7e5',

    // Input + controls
    inputFill: '#ffffff',
    inputFillError: '#fff0f0',
    inputBorder: '#aabdcf',
    inputBorderFocus: primitives.accent,

    // Focus outline
    focus: primitives.accent,

    // Custom highlights
    progressBarTrackFill: '#dfe5e4',
    tickFill: primitives.primary,
    tickFillHover: '#5e9c7f',
  },

  typography: {
    font100: {
      fontFamily: 'Proza Libre, sans-serif',
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: '16px',
    },
    font200: {
      fontFamily: 'Proza Libre, sans-serif',
      fontSize: '14px',
      fontWeight: 400,
      lineHeight: '20px',
    },
    font300: {
      fontFamily: 'Proza Libre, sans-serif',
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: '24px',
    },
    font400: {
      fontFamily: 'Ysabeau Office, sans-serif',
      fontSize: '18px',
      fontWeight: 400,
      lineHeight: '28px',
    },
    font500: {
      fontFamily: 'Ysabeau Office, sans-serif',
      fontSize: '20px',
      fontWeight: '500',
      lineHeight: '30px',
    },
    font600: {
      fontFamily: 'Ysabeau Office, sans-serif',
      fontSize: '24px',
      fontWeight: '600',
      lineHeight: '32px',
    },
    font700: {
      fontFamily: 'Ysabeau Office, sans-serif',
      fontSize: '32px',
      fontWeight: '700',
      lineHeight: '40px',
    },
    font800: {
      fontFamily: 'Ysabeau Office, sans-serif',
      fontSize: '40px',
      fontWeight: '800',
      lineHeight: '48px',
    },
  },
});

export default customTheme;