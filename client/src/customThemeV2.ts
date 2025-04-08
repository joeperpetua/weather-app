import { createTheme } from 'baseui';

const colorOverrides = {
  backgroundPrimary: '#fbfbfe',
  backgroundSecondary: '#ffffff',
  contentPrimary: '#050315',
  primary: '#2f27ce',
  secondary: '#dedcff',
  primaryA: '#2f27ce',
  primaryB: '#dedcff',
  accent: '#ee8f01',
  contentAccent: '#ee8f01',
  buttonPrimaryFill: '#2f27ce',
  buttonPrimaryHover: '#2A22B4',
  buttonPrimaryActive: '#201A99',
  linkText: '#ee8f01',
};

const typographyOverrides = {
  HeadingXXLarge: { fontFamily: 'Ysabeau Office, sans-serif' },
  HeadingXLarge: { fontFamily: 'Ysabeau Office, sans-serif' },
  HeadingLarge: { fontFamily: 'Ysabeau Office, sans-serif' },
  HeadingMedium: { fontFamily: 'Ysabeau Office, sans-serif' },
  HeadingSmall: { fontFamily: 'Ysabeau Office, sans-serif' },
  HeadingXSmall: { fontFamily: 'Ysabeau Office, sans-serif' },

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

export const customThemeV2 = createTheme(overrides);