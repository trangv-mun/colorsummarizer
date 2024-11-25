import daisyui from "daisyui"

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        tritanomaly: {
          "primary": "#161317",
          "secondary": "#23575D",
          "accent": "#edc97a",
          "neutral": "#ec6d48",
          "primary-content": 'white'
        },
        tritanopia: {
          "primary": "#F78486",
          "secondary": "#AA3F3F",
          "accent": "#FFDFE1",
          "success": "#568686",
          "primary-content": '#020900'
        },
        achromatomaly: {
          "primary": "#855168",
          "secondary": "#CDE1EB",
          "accent": "#b29CAA",
          "success": "#6DD09F",
          "primary-content": '#020900'
        },
        achromatopsia: {
          "primary": "#141414",
          "secondary": "#474747",
          "accent": "#dedede",
          "neutral": "#999999",
          "primary-content": 'white'
        },
        protanopia: {
          "primary": "#38385d",
          "secondary": "#eeee82",
          "accent": "#bfbe4c",
          "neutral": "#141417",
          "primary-content": 'white'
        },
        deuteranopia: {
          "primary": "#35315c",
          "secondary": "#eeed8b",
          "accent": "#c6ce50",
          "neutral": "#23261a",
          "primary-content": 'white'
        },
        deuteranomaly: {
          "primary": "#2c475e",
          "secondary": "#d99c45",
          "accent": "#edef74",
          "neutral": "#29161d",
          "primary-content": 'white'
        },
        protanomaly: {
          "primary": "#2b445e",
          "secondary": "#dba544",
          "accent": "#2a181d",
          "neutral": "#161318",
          "primary-content": "#ffffff"
        },
      }
    ]
  }
};