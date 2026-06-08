import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Backgrounds
        'bg-primary': '#FAFAF8',
        'bg-secondary': '#F4F3F0',
        'bg-tertiary': '#EEECEA',
        'bg-dark': '#1A1E2A',
        'bg-dark-card': 'rgba(255,255,255,0.06)',

        // Text
        'text-primary': '#1C1C1E',
        'text-secondary': '#3A3A42',
        'text-tertiary': '#5E5E66',
        'text-muted': '#A0A0A8',
        'text-inverse': '#F0F0EF',

        // Borders
        'border-default': '#E2E1DD',
        'border-strong': '#C8C7C2',

        // Accent
        'accent-primary': '#2D5BE3',
        'accent-hover': '#2450CC',
        'accent-light': '#EEF2FD',

        // Status colors
        'verified-green': '#1A7A4A',
        'verified-light': '#E8F7EE',
        'error-red': '#C0392B',
        'error-light': '#FDEEEE',
        'warning-amber': '#B45309',
        'warning-light': '#FEF6E4',

        // Domain colors
        d01: '#2D5BE3',
        d02: '#0F6B5E',
        d03: '#6B3FA0',
        d04: '#B45309',
        d05: '#1A7A4A',
        d06: '#4A4A52',
        d07: '#4A4A52',
        d08: '#4A4A52',
        d09: '#4A4A52',
        d10: '#4A4A52',
        d11: '#5B6678',
        d12: '#4A4A52',
        glo: '#5B6678',

        // Framework colors
        'as-color': '#0F6B5E',
        'ind-as-color': '#6B3FA0',
        'ifrs-color': '#B45309',
      },

      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Lora', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },

      fontSize: {
        'display-2xl': ['72px', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        'display-xl':  ['48px', { lineHeight: '1.10', letterSpacing: '-0.02em' }],
        'display-lg':  ['36px', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        'display-md':  ['30px', { lineHeight: '1.20', letterSpacing: '-0.01em' }],

        'heading-xl': ['24px', { lineHeight: '1.25' }],
        'heading-lg': ['22px', { lineHeight: '1.30' }],
        'heading-md': ['18px', { lineHeight: '1.35' }],
        'heading-sm': ['16px', { lineHeight: '1.40' }],

        'body-xl': ['18px', { lineHeight: '1.75' }],
        'body-lg': ['16px', { lineHeight: '1.65' }],
        'body-md': ['15px', { lineHeight: '1.60' }],
        'body-sm': ['14px', { lineHeight: '1.55' }],

        'label-lg': ['14px', { lineHeight: '1.40' }],
        'label-md': ['13px', { lineHeight: '1.40' }],
        'label-sm': ['12px', { lineHeight: '1.35' }],
        'label-xs': ['11px', { lineHeight: '1.30' }],

        'mono-lg': ['16px', { lineHeight: '1.70' }],
        'mono-md': ['14px', { lineHeight: '1.65' }],
        'mono-sm': ['13px', { lineHeight: '1.60' }],
        'mono-xs': ['12px', { lineHeight: '1.50' }],
      },

      spacing: {
        '1':  '4px',
        '2':  '8px',
        '3':  '12px',
        '4':  '16px',
        '5':  '20px',
        '6':  '24px',
        '8':  '32px',
        '10': '40px',
        '12': '48px',
        '16': '64px',
        '20': '80px',
        '24': '96px',
        '32': '128px',
      },

      borderRadius: {
        'sm':  '4px',
        DEFAULT: '6px',
        'md':  '8px',
        'lg':  '12px',
        'xl':  '16px',
        'full': '9999px',
      },

      maxWidth: {
        'reading': '680px',
        'content': '1280px',
        'sidebar': '220px',
      },

      boxShadow: {
        'xs':    '0 1px 2px rgba(0,0,0,0.05)',
        'sm':    '0 2px 8px rgba(0,0,0,0.08)',
        'md':    '0 4px 16px rgba(0,0,0,0.12)',
        'lg':    '0 8px 32px rgba(0,0,0,0.16)',
        'focus': '0 0 0 3px rgba(45,91,227,0.25)',
      },
    },
  },
  plugins: [],
}

export default config
