import { createTheme } from 'baseui';

const colorOverrides = {
  backgroundPrimary: '#f9fbfb',
  backgroundSecondary: '#ffffff',
  contentPrimary: '#09110e',
  primary: '#067eb3',
  primaryA: '#067eb3',
  buttonPrimaryFill: '#067eb3',
  buttonPrimaryHover: '#056d9c',
  buttonPrimaryActive: '#045c85',
  buttonPrimaryText: '#ffffff',
  accent: '#ed8901',
  linkText: '#ed8901',
  linkVisited: '#ed8901'
};

const typographyOverrides = {
  DisplayLarge: { fontFamily: 'Red Hat Display, sans-serif' },
  DisplayMedium: { fontFamily: 'Red Hat Display, sans-serif' },
  DisplaySmall: { fontFamily: 'Red Hat Display, sans-serif' },
  DisplayXSmall: { fontFamily: 'Red Hat Display, sans-serif' },

  HeadingXXLarge: { fontFamily: 'Red Hat Display, sans-serif' },
  HeadingXLarge: { fontFamily: 'Red Hat Display, sans-serif' },
  HeadingLarge: { fontFamily: 'Red Hat Display, sans-serif' },
  HeadingMedium: { fontFamily: 'Red Hat Display, sans-serif' },
  HeadingSmall: { fontFamily: 'Red Hat Display, sans-serif' },
  HeadingXSmall: { fontFamily: 'Red Hat Display, sans-serif' },

  LabelLarge: { fontFamily: 'Red Hat Text, sans-serif' },
  LabelMedium: { fontFamily: 'Red Hat Text, sans-serif' },
  LabelSmall: { fontFamily: 'Red Hat Text, sans-serif' },
  ParagraphLarge: { fontFamily: 'Red Hat Text, sans-serif' },
  ParagraphMedium: { fontFamily: 'Red Hat Text, sans-serif' },
  ParagraphSmall: { fontFamily: 'Red Hat Text, sans-serif' },
  ParagraphXSmall: { fontFamily: 'Red Hat Text, sans-serif' },

  MonoDisplayLarge: { fontFamily: 'Red Hat Mono, monospace' },
  MonoDisplayMedium: { fontFamily: 'Red Hat Mono, monospace' },
  MonoDisplaySmall: { fontFamily: 'Red Hat Mono, monospace' },
  MonoDisplayXSmall: { fontFamily: 'Red Hat Mono, monospace' },
  MonoHeadingLarge: { fontFamily: 'Red Hat Mono, monospace' },
  MonoHeadingMedium: { fontFamily: 'Red Hat Mono, monospace' },
  MonoHeadingSmall: { fontFamily: 'Red Hat Mono, monospace' },
  MonoHeadingXLarge: { fontFamily: 'Red Hat Mono, monospace' },
  MonoHeadingXSmall: { fontFamily: 'Red Hat Mono, monospace' },
  MonoHeadingXXLarge: { fontFamily: 'Red Hat Mono, monospace' },
  MonoLabelLarge: { fontFamily: 'Red Hat Mono, monospace' },
  MonoLabelMedium: { fontFamily: 'Red Hat Mono, monospace' },
  MonoLabelSmall: { fontFamily: 'Red Hat Mono, monospace' },
  MonoLabelXSmall: { fontFamily: 'Red Hat Mono, monospace' },
  MonoParagraphLarge: { fontFamily: 'Red Hat Mono, monospace' },
  MonoParagraphMedium: { fontFamily: 'Red Hat Mono, monospace' },
  MonoParagraphSmall: { fontFamily: 'Red Hat Mono, monospace' },
  MonoParagraphXSmall: { fontFamily: 'Red Hat Mono, monospace' }
};

const overrides = {
  colors: colorOverrides,
  typography: typographyOverrides,
};

export const customTheme = createTheme(overrides);