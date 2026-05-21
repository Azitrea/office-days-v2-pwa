---
name: Morning Latte
colors:
  surface: '#fff5ec'
  surface-dim: '#ffcc84'
  surface-bright: '#fff5ec'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#ffeedc'
  surface-container: '#ffe4c3'
  surface-container-high: '#ffddb2'
  surface-container-highest: '#ffd6a0'
  on-surface: '#422a00'
  on-surface-variant: '#765523'
  inverse-surface: '#170c00'
  inverse-on-surface: '#be965d'
  outline: '#94703b'
  outline-variant: '#d0a66c'
  surface-tint: '#864e00'
  primary: '#864e00'
  on-primary: '#fff0e5'
  primary-container: '#fe9801'
  on-primary-container: '#4a2900'
  inverse-primary: '#fe9801'
  secondary: '#7e5300'
  on-secondary: '#fff0e1'
  secondary-container: '#ffc87b'
  on-secondary-container: '#634000'
  tertiary: '#695b00'
  on-tertiary: '#fff3c4'
  tertiary-container: '#fce047'
  on-tertiary-container: '#5c5000'
  error: '#b02500'
  on-error: '#ffefec'
  error-container: '#f95630'
  on-error-container: '#520c00'
  primary-fixed: '#fe9801'
  primary-fixed-dim: '#eb8d00'
  on-primary-fixed: '#271300'
  on-primary-fixed-variant: '#563000'
  secondary-fixed: '#ffc87b'
  secondary-fixed-dim: '#ffb641'
  on-secondary-fixed: '#4a2f00'
  on-secondary-fixed-variant: '#6f4900'
  tertiary-fixed: '#fce047'
  tertiary-fixed-dim: '#edd139'
  on-tertiary-fixed: '#473d00'
  on-tertiary-fixed-variant: '#675900'
  primary-dim: '#764400'
  secondary-dim: '#6e4800'
  tertiary-dim: '#5c4f00'
  error-dim: '#b92902'
  background: '#fff5ec'
  on-background: '#422a00'
  surface-variant: '#ffd6a0'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Be Vietnam Pro
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Be Vietnam Pro
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Be Vietnam Pro
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Be Vietnam Pro
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.04em
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
  gutter: 20px
  margin-mobile: 20px
  margin-desktop: auto
  max-width: 1200px
---

## Brand & Style

This design system is crafted for a serene, ritualistic coffee experience. The brand personality is welcoming, sophisticated, and tranquil, aimed at users who view their morning coffee as a moment of mindfulness rather than a hurried task. 

The style utilizes a **Modern-Minimalist** foundation infused with **Soft-Tactile** elements. With the shift to a **Vibrant** color palette, the system now emphasizes the warmth of a morning sunrise and the rich, golden crema of a perfect espresso. By blending organic warmth with a clean, contemporary digital execution, the UI evokes an emotional response of energy, clarity, and comfort.

## Colors

The palette is energized by **Vibrant Amber**, used for primary actions and brand emphasis to evoke the warmth of the sun. The background and neutral surfaces are anchored by **Muted Bronze** tones, providing a sophisticated, earthy alternative to standard grays.

**Golden Yellow** serves as the secondary accent, providing a harmonious transition between the vibrant amber and the grounded neutral tones. A tertiary **Olive Gold** is utilized for subtle containment and secondary surfaces, adding depth to the organic, coffee-inspired palette while maintaining high visual energy.

## Typography

The typography system balances modern geometry with approachable warmth. **Plus Jakarta Sans** is used for headlines; its soft, rounded terminals echo the inviting nature of the brand. **Be Vietnam Pro** is selected for body copy and labels due to its contemporary feel and exceptional legibility at smaller sizes.

Hierarchy is established through significant scale shifts and the use of the Muted Bronze and Amber for headings. Body text utilizes a deep neutral tone to maintain high contrast while appearing more integrated with the warm, earthy background than pure black would.

## Layout & Spacing

The layout follows a **Fixed Grid** philosophy for desktop to maintain a boutique, editorial feel, transitioning to a fluid model for mobile devices. A 12-column system is used for desktop, while a 4-column system is standard for mobile.

Spacing is generous, favoring "air" to prevent the interface from feeling cluttered. We utilize an 8px base unit. Margins are intentionally wide to draw the eye inward toward the content, mirroring the focused experience of enjoying a drink. Section padding (xl) is used to clearly demarcate different content types, creating a rhythmic, easy-to-digest browsing experience.

## Elevation & Depth

To maintain the "airy" aesthetic, this design system avoids heavy, dark shadows. Instead, it utilizes **Tonal Layers** and **Ambient Tinted Shadows**. 

Depth is primarily communicated by placing elements on surfaces that are slightly lighter or more saturated than the main background. When physical elevation is required (such as for floating action buttons or menus), use ultra-soft shadows with a large blur radius, using a very low-opacity version of the Bronze Neutral (#95713C at 8-10% alpha) rather than pure black. This creates a "lifted" effect that feels organic to the vibrant, warm color palette.

## Shapes

The shape language is consistently **Rounded**. This choice reinforces the friendly and soft narrative of the brand. Sharp corners are avoided entirely as they appear too aggressive for the desired emotional response. 

Standard components like input fields and buttons use a 0.5rem radius. Larger containers, such as cards and featured modals, use the `rounded-xl` (1.5rem) setting to create a friendly, "nested" appearance. Interactive icons and selection indicators may use pill-shapes (circular ends) to maximize the feeling of softness.

## Components

### Buttons
Primary buttons use a Vibrant Amber fill with high-contrast text for maximum impact against the earthy background. Secondary buttons use a ghost style with a Muted Bronze outline and text. All buttons feature a 0.5rem corner radius.

### Input Fields
Fields are styled with a subtle Bronze-tinted fill and a 1px border that darkens on focus. The focus state uses an Amber glow (2px spread, low opacity) to indicate activity.

### Cards
Cards are the primary container for content. They should have no border, a slightly elevated background derived from the neutral bronze tones, and a soft ambient shadow.

### Chips & Tags
Used for coffee origins or flavor profiles. These should be pill-shaped with a light Golden Yellow background and deep Bronze text, creating a tactile, "label-like" appearance.

### Interactive States
Hover states on Amber elements should involve a slight saturation increase. Click states (active) should involve a subtle scale-down (98%) to provide tactile feedback.