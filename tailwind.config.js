/** @type {import('tailwindcss').Config} */
const color = (name) => `rgb(var(--color-${name}-rgb) / <alpha-value>)`;

module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        surface: color("surface"),
        "surface-dim": color("surface-dim"),
        "surface-bright": color("surface-bright"),
        "surface-container-lowest": color("surface-container-lowest"),
        "surface-container-low": color("surface-container-low"),
        "surface-container": color("surface-container"),
        "surface-container-high": color("surface-container-high"),
        "surface-container-highest": color("surface-container-highest"),
        "on-surface": color("on-surface"),
        "on-surface-variant": color("on-surface-variant"),
        "inverse-surface": color("inverse-surface"),
        "inverse-on-surface": color("inverse-on-surface"),
        outline: color("outline"),
        "outline-variant": color("outline-variant"),
        "surface-tint": color("surface-tint"),
        primary: color("primary"),
        "on-primary": color("on-primary"),
        "primary-container": color("primary-container"),
        "on-primary-container": color("on-primary-container"),
        "inverse-primary": color("inverse-primary"),
        secondary: color("secondary"),
        "on-secondary": color("on-secondary"),
        "secondary-container": color("secondary-container"),
        "on-secondary-container": color("on-secondary-container"),
        tertiary: color("tertiary"),
        "on-tertiary": color("on-tertiary"),
        "tertiary-container": color("tertiary-container"),
        "on-tertiary-container": color("on-tertiary-container"),
        error: color("error"),
        "on-error": color("on-error"),
        "error-container": color("error-container"),
        "on-error-container": color("on-error-container"),
        background: color("background"),
        "on-background": color("on-background"),
        "surface-variant": color("surface-variant"),
        cream: color("cream"),
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', "sans-serif"],
      },
      borderRadius: {
        sm: "0.25rem",
        DEFAULT: "0.5rem",
        md: "0.75rem",
        lg: "1rem",
        xl: "1.5rem",
      },
      maxWidth: {
        container: "1200px",
      },
      boxShadow: {
        "primary-glow": "0 0 24px rgb(var(--color-primary-rgb) / 0.38)",
        "primary-glow-hover": "0 0 32px rgb(var(--color-primary-rgb) / 0.5)",
      },
    },
  },
  plugins: [],
}

