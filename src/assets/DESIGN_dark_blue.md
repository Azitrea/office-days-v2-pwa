---
name: Nocturnal Amber
colors:
  surface: '#001526'
  surface-dim: '#001526'
  surface-bright: '#273b4d'
  surface-container-lowest: '#000f1e'
  surface-container-low: '#071d2e'
  surface-container: '#0c2133'
  surface-container-high: '#182c3d'
  surface-container-highest: '#233649'
  on-surface: '#d0e5fc'
  on-surface-variant: '#dac2ae'
  inverse-surface: '#d0e5fc'
  inverse-on-surface: '#1e3244'
  outline: '#a28d7a'
  outline-variant: '#544434'
  surface-tint: '#ffb86b'
  primary: '#ffc68b'
  on-primary: '#492900'
  primary-container: '#ff9f1c'
  on-primary-container: '#683c00'
  inverse-primary: '#895100'
  secondary: '#4fdbcc'
  on-secondary: '#003732'
  secondary-container: '#00b1a3'
  on-secondary-container: '#003d37'
  tertiary: '#ffc2bf'
  on-tertiary: '#680010'
  tertiary-container: '#ff9996'
  on-tertiary-container: '#92001a'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdcbc'
  primary-fixed-dim: '#ffb86b'
  on-primary-fixed: '#2c1700'
  on-primary-fixed-variant: '#683d00'
  secondary-fixed: '#70f8e8'
  secondary-fixed-dim: '#4fdbcc'
  on-secondary-fixed: '#00201d'
  on-secondary-fixed-variant: '#005049'
  tertiary-fixed: '#ffdad8'
  tertiary-fixed-dim: '#ffb3b0'
  on-tertiary-fixed: '#410006'
  on-tertiary-fixed-variant: '#93001a'
  background: '#001526'
  on-background: '#d0e5fc'
  surface-variant: '#233649'
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
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
---

## Brand & Style
The design system is centered on a "Midnight Coffee" narrative—evoking the quiet, focused energy of a late-night cafe. The brand personality is premium, sophisticated, and deeply calm, catering to users who seek a focused, low-eye-strain environment during nocturnal hours. 

The aesthetic blends **Modern Corporate** precision with **Glassmorphism** to prevent the dark interface from feeling heavy. By utilizing translucent layers and deep navy depths, the UI maintains a sense of airiness despite its dark palette. The emotional response is one of reliability and "warmth in the dark," achieved through the sharp contrast of amber against vast, cool depths.

## Colors
The palette is built on a foundation of "Deep Navy" (#011627) to provide a more sophisticated alternative to pure black. The primary accent is a vibrant Amber (#FF9F1C), used sparingly to draw the eye to critical actions and status indicators. 

Secondary surfaces utilize a slightly lighter "Midnight Blue" (#0B2239) to create structural hierarchy. Success and error states follow a high-chroma scheme to remain legible against the dark background, ensuring the interface remains accessible and vibrant.

## Typography
Plus Jakarta Sans is the exclusive typeface for the design system, chosen for its modern, geometric shapes and excellent legibility in dark modes. 

Headlines use heavy weights and slight negative letter-spacing to create a compact, authoritative look. Body text maintains generous line heights to ensure long-form content is readable against high-contrast backgrounds. Labels and small metadata should use increased letter-spacing and bold weights to maintain clarity at small scales.

## Layout & Spacing
The layout follows a 12-column fluid grid system with a fixed maximum width for desktop environments to maintain focus. We utilize an 8px base unit for all rhythmic spacing.

- **Desktop:** 12 columns, 24px gutters, 40px side margins.
- **Tablet:** 8 columns, 20px gutters, 24px side margins.
- **Mobile:** 4 columns, 16px gutters, 16px side margins.

Horizontal spacing between related elements (like icons and labels) should use 8px or 12px, while vertical section spacing should scale from 48px to 80px to preserve the premium, "roomy" feel.

## Elevation & Depth
Depth in the design system is communicated through **Tonal Layering** and **Subtle Blurs** rather than traditional heavy shadows. 

1. **Base Level:** The background navy (#011627).
2. **Surface Level:** Elements like cards use a slightly lighter blue (#0B2239) with a 1px inner border of `rgba(255, 255, 255, 0.05)` to define edges.
3. **Elevated Level:** Modals and menus use a glassmorphic effect—`backdrop-filter: blur(12px)` with a semi-transparent navy fill.
4. **Interactive State:** Hovered items should emit a soft amber glow (`box-shadow: 0 0 20px rgba(255, 159, 28, 0.15)`).

## Shapes
The design system utilizes a "Rounded" shape language (0.5rem base) to soften the technical feel of the dark theme. 

Larger containers like cards and main content areas should use `rounded-xl` (1.5rem) to create a friendly, modern container feel. Buttons and input fields should strictly adhere to the 0.5rem standard to maintain a professional, balanced silhouette.

## Components

### Buttons
- **Primary:** Solid Amber (#FF9F1C) with dark navy text. No shadow in rest state; soft glow on hover.
- **Secondary:** Transparent with a 1.5px Amber border. Amber text.
- **Ghost:** No background, navy-white text. Amber tint on hover background.

### Input Fields
Inputs use a darker "sunken" background than the card surface. The border is a subtle `white/10%`, turning to a solid 2px Amber border upon focus. Labels should always be visible above the field in `label-sm`.

### Cards
Cards are the primary organizational unit. They should have no external shadows; instead, use a 1px stroke of `white/5%` and a slightly lighter blue fill than the background.

### Chips & Tags
Used for categories or status. They should use a low-opacity version of the status color (e.g., Amber at 15% opacity) with a fully opaque text label to maintain readability without overwhelming the layout.

### Lists
List items are separated by subtle `white/5%` dividers. The "active" or "selected" list item should utilize a left-edge Amber accent bar (4px width).