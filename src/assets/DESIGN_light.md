---
name: Luminous Amber
colors:
  surface: '#f8f9fa'
  surface-dim: '#d9dadb'
  surface-bright: '#f8f9fa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4f5'
  surface-container: '#edeeef'
  surface-container-high: '#e7e8e9'
  surface-container-highest: '#e1e3e4'
  on-surface: '#191c1d'
  on-surface-variant: '#544434'
  inverse-surface: '#2e3132'
  inverse-on-surface: '#f0f1f2'
  outline: '#877462'
  outline-variant: '#dac2ae'
  surface-tint: '#895100'
  primary: '#895100'
  on-primary: '#ffffff'
  primary-container: '#ff9f1c'
  on-primary-container: '#683c00'
  inverse-primary: '#ffb86b'
  secondary: '#006a62'
  on-secondary: '#ffffff'
  secondary-container: '#70f8e8'
  on-secondary-container: '#007168'
  tertiary: '#006686'
  on-tertiary: '#ffffff'
  tertiary-container: '#00c3fd'
  on-tertiary-container: '#004d66'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdcbc'
  primary-fixed-dim: '#ffb86b'
  on-primary-fixed: '#2c1700'
  on-primary-fixed-variant: '#683d00'
  secondary-fixed: '#70f8e8'
  secondary-fixed-dim: '#4fdbcc'
  on-secondary-fixed: '#00201d'
  on-secondary-fixed-variant: '#005049'
  tertiary-fixed: '#c0e8ff'
  tertiary-fixed-dim: '#70d2ff'
  on-tertiary-fixed: '#001e2b'
  on-tertiary-fixed-variant: '#004d66'
  background: '#f8f9fa'
  on-background: '#191c1d'
  surface-variant: '#e1e3e4'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '800'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.3'
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: '1.3'
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.01em
  caption:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.2'
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
  margin-desktop: 40px
---

## Brand & Style
The design system is engineered for EspressoBreak to feel fresh, energetic, and professional. It targets the "productive socialite"—users who value clarity and speed but appreciate a warm, inviting atmosphere. 

The aesthetic is **Corporate Modern with a Minimalist lean**. It leverages heavy whitespace and a restricted color palette to ensure the amber primary accent provides maximum visual impact. The interface should feel breathable and high-end, avoiding clutter to allow the typography and key actions to drive the user experience.

## Colors
This design system utilizes a "High-Leaven" light mode. The background is a crisp white (#FFFFFF), while structural containers use very light grays to create subtle separation.

- **Primary Amber (#FF9F1C):** Reserved for high-priority calls to action, active states, and brand highlights. It represents the "energy" of the coffee break.
- **Secondary Teal (#2EC4B6):** Used sparingly for success states or secondary interactive elements to provide a refreshing contrast to the amber.
- **Neutrals:** A palette of cool slates and grays ensures the interface remains professional and readable. Surfaces use #F8F9FA to maintain a soft but clean depth.

## Typography
Plus Jakarta Sans is the exclusive typeface, chosen for its modern, geometric curves and professional legibility. 

- **Headlines:** Utilize heavier weights (700-800) and tight letter-spacing to create a punchy, editorial feel. 
- **Body Text:** Set with generous line heights (1.6) to ensure long-form content is digestible. 
- **Labels:** Use semi-bold weights and slight tracking to distinguish them from body copy, perfect for navigation and small UI markers.

## Layout & Spacing
The design system follows a **12-column fluid grid** for desktop and a **4-column grid** for mobile. 

- **Spacing Rhythm:** Based on an 8px root scale to maintain mathematical harmony. 
- **Margins:** Desktop views utilize wide 40px margins to emphasize the "Fresh" and "Minimalist" brand pillars. 
- **Reflow:** On mobile, horizontal padding scales down to 16px, and vertical spacing between cards increases to maintain touch-target integrity.

## Elevation & Depth
Depth is achieved through **Tonal Layers** and **Ambient Shadows**. 

- **Layers:** The base canvas is #FFFFFF. Secondary surfaces (like sidebars or card backgrounds) sit on #F8F9FA.
- **Shadows:** Use extremely soft, long-range shadows for floating elements (modals, dropdowns). Shadows should have a slight tint of the primary text color (Slate) at very low opacity (e.g., `box-shadow: 0 10px 30px rgba(15, 23, 42, 0.05)`).
- **Interactive Depth:** On hover, buttons and cards should subtly lift using a slightly more pronounced ambient shadow, rather than a color change alone.

## Shapes
The shape language is consistently **Rounded**, reflecting the approachable and friendly nature of a coffee-centric app. 

- **Standard Elements:** Buttons and input fields use a 0.5rem (8px) radius.
- **Large Containers:** Content cards and feature blocks use `rounded-lg` (1rem / 16px) to soften the layout.
- **Iconography:** Icons should feature rounded caps and corners to match the Plus Jakarta Sans geometry.

## Components
- **Buttons:** Primary buttons use the #FF9F1C Amber with white text. Secondary buttons use a ghost style with an Amber border or a light gray fill.
- **Input Fields:** Soft gray borders (#E2E8F0) that transition to a 2px Amber border on focus. Labels sit clearly above the field in `label-md`.
- **Cards:** White backgrounds with a subtle 1px border in #F1F5F9. No heavy shadows unless the card is interactive.
- **Chips:** Used for coffee categories or tags. High-pill shape with a light amber tint background and darker amber text.
- **Lists:** Clean dividers using 1px #F1F5F9, with generous vertical padding (16px) between items.
- **Progress Bars:** Use the primary Amber for the fill and a soft gray for the track, representing the "brewing" or "loading" state.