---
name: Sunrise Roast
colors:
  surface: '#eefcfd'
  surface-dim: '#cfdddd'
  surface-bright: '#eefcfd'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#e9f6f7'
  surface-container: '#e3f0f1'
  surface-container-high: '#ddebec'
  surface-container-highest: '#d8e5e6'
  on-surface: '#121e1f'
  on-surface-variant: '#564337'
  inverse-surface: '#263334'
  inverse-on-surface: '#e6f3f4'
  outline: '#897365'
  outline-variant: '#dcc1b1'
  surface-tint: '#944a00'
  primary: '#944a00'
  on-primary: '#ffffff'
  primary-container: '#e67e22'
  on-primary-container: '#502600'
  inverse-primary: '#ffb783'
  secondary: '#4e6073'
  on-secondary: '#ffffff'
  secondary-container: '#cfe2f9'
  on-secondary-container: '#526478'
  tertiary: '#865300'
  on-tertiary: '#ffffff'
  tertiary-container: '#d78800'
  on-tertiary-container: '#482b00'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdcc5'
  primary-fixed-dim: '#ffb783'
  on-primary-fixed: '#301400'
  on-primary-fixed-variant: '#713700'
  secondary-fixed: '#d1e4fb'
  secondary-fixed-dim: '#b5c8df'
  on-secondary-fixed: '#091d2e'
  on-secondary-fixed-variant: '#36485b'
  tertiary-fixed: '#ffddb9'
  tertiary-fixed-dim: '#ffb961'
  on-tertiary-fixed: '#2b1700'
  on-tertiary-fixed-variant: '#663e00'
  background: '#eefcfd'
  on-background: '#121e1f'
  surface-variant: '#d8e5e6'
typography:
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '800'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '800'
    lineHeight: 36px
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  body-lg:
    fontFamily: Work Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Work Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Work Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-bold:
    fontFamily: Work Sans
    fontSize: 14px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.05em
  label-md:
    fontFamily: Work Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
---

## Brand & Style

The design system is engineered for **EspressoBreak**, targeting early-morning achievers and coffee enthusiasts who value clarity and energy. The brand personality is morning-vibrant, dependable, and highly legible, aiming to evoke a sense of productivity and a fresh start.

The aesthetic follows a **High-Contrast / Bold** modern style. It leverages massive, confident typography and a tight, punchy color palette to drive user action. While the layout is clean and spacious, the interactive elements are unapologetically bold, utilizing heavy weights and saturated primary accents to ensure high visibility and a distinct "caffeinated" energy.

## Colors

The palette is anchored by **Burnt Orange**, a high-energy hue used exclusively for primary calls to action and critical brand moments. This is balanced by **Slate Charcoal**, which provides the necessary "grounding" for the interface, used for typography and structural elements to ensure professional stability.

The background is a clinical **Clean White**, allowing the vibrant accents to pop without visual noise. A tertiary warm gold is utilized for progress indicators or highlights, while a neutral slate-gray handles disabled states and borders.

## Typography

This design system employs **Plus Jakarta Sans** for headlines to provide a modern, friendly, yet authoritative voice. The extra-bold weights and tight letter-spacing in the `headline-xl` tier create an impactful "editorial" feel that commands attention.

For body content and functional labels, **Work Sans** is used due to its exceptional legibility and professional, grounded character. Its neutral terminals and balanced proportions ensure that even long-form text remains readable during a quick morning scroll.

## Layout & Spacing

The layout utilizes a **12-column fluid grid** for desktop and a **4-column grid** for mobile. The system relies on a strict 8px base unit to maintain a rhythmic vertical cadence. 

- **Desktop:** 64px outside margins with 24px gutters. Elements should scale fluidly between 1024px and 1440px, then center-align within a max-width container.
- **Mobile:** 16px outside margins to maximize content real estate. Spacing between card elements is reduced to 12px (sm) to maintain a sense of density.

Generous white space (lg and xl units) should be used between major sections to prevent the bold typography from feeling cluttered.

## Elevation & Depth

To maintain the high-visibility aesthetic, this design system moves away from traditional soft shadows. Depth is instead communicated through **Tonal Layering** and **Crisp Outlines**.

1.  **Level 0 (Base):** Clean White (#FFFFFF).
2.  **Level 1 (Cards/Inputs):** Off-white surface (#F8F9FA) with a 1px solid border in light Slate (#E2E8F0).
3.  **Active State:** When an element is focused or active, it receives a 2px solid border of the Primary Burnt Orange.
4.  **Floating Elements (Modals/Popovers):** These use a sharp, 4px "hard shadow" offset (non-diffused) in Slate Charcoal at 10% opacity to mimic a paper-stacked effect common in modern bold UI.

## Shapes

The design system utilizes a **Rounded** (0.5rem) shape language. This softens the intensity of the high-contrast colors and bold typography, making the interface feel approachable rather than aggressive. 

Large containers like cards should utilize the `rounded-lg` (1rem) token to create a friendly frame for content, while utility components like input fields and buttons stay at the standard 0.5rem for a precise, "engineered" look.

## Components

- **Buttons:** Primary buttons are solid Burnt Orange with white text, utilizing `label-bold` typography. Secondary buttons are Slate Charcoal with white text. Ghost buttons use Slate Charcoal text with no background. All buttons have a minimum height of 48px for high touch-accuracy.
- **Input Fields:** Use a 1px border. On focus, the border thickens to 2px and changes to Burnt Orange. Labels are always positioned above the input using the `label-md` style.
- **Cards:** White background with a subtle gray border. No soft shadows. For featured content, a "Sunrise" card variant uses a thin Burnt Orange top-border (4px) to denote importance.
- **Chips/Tags:** Small, pill-shaped elements using the tertiary Gold background at 15% opacity with dark gold text, used for coffee categories or status.
- **Progress Bars:** Thick 8px tracks in light gray with a solid Burnt Orange fill, representing the "brewing" or loading process.
- **Checkboxes/Radios:** When selected, they fill completely with Burnt Orange and use a bold white checkmark icon.