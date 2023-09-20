/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    `storyblok/**/*.{vue,js,ts}`,
    `components/**/*.{vue,js,ts}`,
    `layouts/**/*.vue`,
    `pages/**/*.vue`,
    `composables/**/*.{js,ts}`,
    `plugins/**/*.{js,ts}`,
    `utils/**/*.{js,ts}`,
    `App.{js,ts,vue}`,
    `app.{js,ts,vue}`,
    `Error.{js,ts,vue}`,
    `error.{js,ts,vue}`
  ],
  theme: {
    fontFamily: {
      sans: 'Inter, sans-serif',
      'neue-haas': '"Neue Haas", sans-serif'
    },
    fontSize: {
      xs: ['0.75rem', '1.125rem'],
      sm: ['0.875rem', '1.25rem'],
      base: ['1rem', '1.375rem'],
      lg: ['1.25rem', '1.375rem'],
      xl: ['1.5rem', '1.625rem'],
      '2xl': ['1.75rem', '1.875rem'],
      '3xl': ['2rem', '2.1875rem'],
      '4xl': ['3.5rem', '3.4375rem'],
      '5xl-mobile': ['2.5rem', '2.5rem'],
      '5xl': ['4.75rem', '4.5rem']
    },
    fontWeight: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600'
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      salmon: {
        100: '#FFB4B4',
        200: '#F47677',
        300: '#DC585D',
        400: '#5C3636'
      },
      cyan: {
        100: '#CCFFF4',
        200: '#3DFED6',
        300: '#0C4F53',
        400: '#00343F',
        500: '#07272E'
      },
      brown: {
        100: '#40353C',
        200: '#383037',
        300: '#241F23',
        400: '#1F1A1D',
        500: '#181517'
      },
      grey: {
        100: '#86818C',
        200: '#79747E',
        300: '#4A4357',
        400: '#373539'
      },
      beige: {
        100: '#FDF6EE',
        200: '#FFEBD2'
      },
      orange: {
        100: '#F89981'
      },
      yellow: {
        100: '#FFEDAE',
        200: '#645329'
      },
      black: '#0E0C0D',
      white: '#FFFFFF'
    },
    boxShadow: {
      'inner': 'inset 0 0 0 1px #0E0C0D',
      '2xl': '0 4px 44px #0E0C0D'
    },
    dropShadow: {
      'lg': [
        '0px 0px 3px rgba(0, 0, 0, 0.6)',
        '0px 0px 10px rgba(0, 0, 0, 0.5)'
      ]
    },
    extend: {
      opacity: {
        15: '.15'
      },
      boxShadow: {
        'tab-active': '0 0 18px 9px rgba(24, 21, 23, .5)' // brown-500
      },
      backgroundImage: {
        'scale-lines': "url('@/assets/images/graphics/scale-lines.svg')"
      }
    }
  },
  safelist: [
    // Storyblok - RichText - CSS Style "Footer Headline"
    'uppercase text-grey-300 text-base mb-2 block',
    // Storyblok - RichText - CSS Style "Footer Headline"
    // Storyblok - Headline - Text align
    {
      pattern: /text-(left|center|right)/
    },
    {
      pattern: /grid-(cols|rows)-(1[0-2]|[1-9]|none)/,
      variants: ['sm', 'md', 'lg', 'xl', '2xl']
    },
    {
      pattern: /gap-[xy]?-?(0|3|6|12)$/,
      variants: ['sm', 'md', 'lg', 'xl', '2xl']
    },
    {
      pattern: /justify-items-(start|end|center|stretch)$/,
      variants: ['sm', 'md', 'lg', 'xl', '2xl']
    },
    {
      pattern: /content-(normal|center|start|end|between|around|evenly|baseline|stretch)$/,
      variants: ['sm', 'md', 'lg', 'xl', '2xl']
    },
    {
      pattern: /place-content-(center|start|end|between|around|evenly|baseline|stretch)$/,
      variants: ['sm', 'md', 'lg', 'xl', '2xl']
    },
    {
      pattern: /place-items-(start|end|center|baseline|stretch)$/,
      variants: ['sm', 'md', 'lg', 'xl', '2xl']
    },
    {
      pattern: /col-auto$/,
      variants: ['sm', 'md', 'lg', 'xl', '2xl']
    },
    {
      pattern: /col-span-(1[0-2]|[1-9]|full)$/,
      variants: ['sm', 'md', 'lg', 'xl', '2xl']
    },
    {
      pattern: /col-(start|end)-(1[0-3]|[1-9]|auto)$/,
      variants: ['sm', 'md', 'lg', 'xl', '2xl']
    },
    {
      pattern: /row-auto$/,
      variants: ['sm', 'md', 'lg', 'xl', '2xl']
    },
    {
      pattern: /row-span-([1-7]|full)$/,
      variants: ['sm', 'md', 'lg', 'xl', '2xl']
    },
    {
      pattern: /row-(start|end)-([1-7]|auto)$/,
      variants: ['sm', 'md', 'lg', 'xl', '2xl']
    },
    {
      pattern: /justify-self-(auto|start|end|center|stretch)$/,
      variants: ['sm', 'md', 'lg', 'xl', '2xl']
    },
    {
      pattern: /self-(auto|start|end|center|stretch|baseline)$/,
      variants: ['sm', 'md', 'lg', 'xl', '2xl']
    },
    {
      pattern: /grid-flow-(row|dense|col|row-dense|col-dense)$/,
      variants: ['sm', 'md', 'lg', 'xl', '2xl']
    }
  ],
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant('link-active', '&.router-link-active') // NuxtLink active
    })
  ]
}
