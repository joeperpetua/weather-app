import { createTheme } from 'baseui';

const colorOverrides = {
  backgroundPrimary: '#f9fbfb',
  backgroundSecondary: '#ffffff',
  contentPrimary: '#09110e',
  primary: '#6cac8f',
  secondary: '#aabdcf',
  accent: '#898fbd',
  buttonPrimaryFill: '#6cac8f',
  buttonPrimaryHover: '#5b997e',
  buttonPrimaryActive: '#4a846a',
  linkText: '#898fbd',
};

const typographyOverrides = {
  // Headings: Ysabeau Office
  HeadingXXLarge: { fontFamily: 'Ysabeau Office, sans-serif' },
  HeadingXLarge: { fontFamily: 'Ysabeau Office, sans-serif' },
  HeadingLarge: { fontFamily: 'Ysabeau Office, sans-serif' },
  HeadingMedium: { fontFamily: 'Ysabeau Office, sans-serif' },
  HeadingSmall: { fontFamily: 'Ysabeau Office, sans-serif' },
  HeadingXSmall: { fontFamily: 'Ysabeau Office, sans-serif' },

  // Body text: Proza Libre
  LabelLarge: { fontFamily: 'Proza Libre, sans-serif' },
  LabelMedium: { fontFamily: 'Proza Libre, sans-serif' },
  LabelSmall: { fontFamily: 'Proza Libre, sans-serif' },
  ParagraphLarge: { fontFamily: 'Proza Libre, sans-serif' },
  ParagraphMedium: { fontFamily: 'Proza Libre, sans-serif' },
  ParagraphSmall: { fontFamily: 'Proza Libre, sans-serif' },
};

const overrides = {
  colors: colorOverrides,
  typography: typographyOverrides,
};

export const customTheme = createTheme(overrides);