import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['var(--font-roboto)'],
      },
      colors: {
        'screen-login': '#264160',
        'blue': {
          light: '#253C53',
          middle: '#263e59',
          dark: '#1a3b60'
        },
        gray: {
          light: '#FCFBFA',
          middle: '#F6F7F9'
        }
      },
    },
  },
  plugins: [],
}
export default config
