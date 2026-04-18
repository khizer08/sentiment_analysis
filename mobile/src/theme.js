/**
 * theme.js — Design tokens matching the web app's dark aesthetic
 */

export const colors = {
  bg: '#0a0a0f',
  surface: '#1c1c28',
  surfaceAlt: '#12121a',
  border: '#2a2a3d',
  borderLight: '#3d3d5c',

  textPrimary: '#e8e8f0',
  textSecondary: '#9ca3af',
  textMuted: '#6b7280',

  cyan: '#00ff9d',
  cyanDim: 'rgba(0,255,157,0.15)',

  positive: '#b5ff4d',
  positiveDim: 'rgba(181,255,77,0.15)',
  negative: '#ff4d6d',
  negativeDim: 'rgba(255,77,109,0.15)',
  neutral: '#ffbe0b',
  neutralDim: 'rgba(255,190,11,0.15)',
};

export const typography = {
  heading: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.textPrimary,
    letterSpacing: -0.5,
  },
  subheading: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  body: {
    fontSize: 15,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.2,
    color: colors.textMuted,
    textTransform: 'uppercase',
  },
  mono: {
    fontSize: 13,
    fontFamily: 'monospace',
    color: colors.textSecondary,
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  full: 999,
};
