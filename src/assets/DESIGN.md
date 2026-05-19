---
name: Obsidian Brew
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#3a3939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#dac2ae'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#a28d7a'
  outline-variant: '#544434'
  surface-tint: '#ffb86b'
  primary: '#ffc68b'
  on-primary: '#492900'
  primary-container: '#ff9f1c'
  on-primary-container: '#683c00'
  inverse-primary: '#895100'
  secondary: '#e5beb5'
  on-secondary: '#432a25'
  secondary-container: '#5c403a'
  on-secondary-container: '#d2ada4'
  tertiary: '#d2d2bb'
  on-tertiary: '#303221'
  tertiary-container: '#b6b7a0'
  on-tertiary-container: '#474836'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdcbc'
  primary-fixed-dim: '#ffb86b'
  on-primary-fixed: '#2c1700'
  on-primary-fixed-variant: '#683d00'
  secondary-fixed: '#ffdad2'
  secondary-fixed-dim: '#e5beb5'
  on-secondary-fixed: '#2b1611'
  on-secondary-fixed-variant: '#5c403a'
  tertiary-fixed: '#e4e4cc'
  tertiary-fixed-dim: '#c8c8b0'
  on-tertiary-fixed: '#1b1d0e'
  on-tertiary-fixed-variant: '#474836'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '800'
    lineHeight: 48px
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
    fontWeight: '500'
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
  gutter: 16px
  margin-mobile: 20px
  margin-desktop: 40px
  container-max-width: 1200px
---

## Brand & Style

The design system is centered on a high-contrast, premium dark-mode experience tailored for the social ritual of coffee breaks. It evokes the atmosphere of a high-end, dimly lit espresso bar—sophisticated, warm, and energizing.

The aesthetic blends **Minimalism** with **Glassmorphism**. By using deep obsidian surfaces as the foundation, the UI allows vibrant coffee-inspired accents to guide the user's eye. The emotional goal is to feel "exclusive yet inviting," transforming a simple break into a curated social event. High-contrast type ensures legibility against dark backgrounds, while translucent layers provide a sense of depth and modernity.

## Colors

This color palette is inspired by the roasting process and the golden hues of a perfect crema.

- **Primary (Rich Amber):** Used for primary actions, notifications, and active states. It provides the "caffeine kick" of visual energy against the dark base.
- **Secondary (Espresso Brown):** Used for subtle backgrounds, secondary buttons, and decorative elements to ground the vibrant amber.
- **Tertiary (Warm Cream):** Reserved for high-contrast typography and delicate icons, ensuring a softer visual experience than pure white.
- **Neutral (Obsidian & Charcoal):** The foundation. `#0F0F0F` (Obsidian) serves as the main background, while `#1A1A1A` (Charcoal) is used for container surfaces to create subtle separation.

## Typography

The typography system uses **Plus Jakarta Sans** for all roles to maintain a contemporary, clean, and optimistic feel. 

- **Headlines:** Use heavy weights (700-800) with slight negative letter spacing to create a compact, impactful look for "Latest Messages" and "Dashboard" headers.
- **Body:** Set with generous line heights (1.5x+) to ensure long-form text remains readable against high-contrast backgrounds.
- **Labels:** Uppercase styling is encouraged for small labels (like timestamps or "v1.0.9") to improve scannability without increasing font size.

## Layout & Spacing

The layout philosophy follows a **Fluid Grid** model with a focus on "breathable" containers. 

- **Base Unit:** An 8px linear scale governs all padding and margins.
- **Mobile:** A single-column layout with 20px side margins. Elements like coffee cards should span the full width minus margins.
- **Desktop:** A 12-column grid. On the dashboard, secondary information (like profile stats) can occupy a side rail (4 columns) while the message feed occupies the main area (8 columns).
- **Density:** We prioritize "Generous Spacing." Card internal padding should never drop below 24px (3 units) to maintain the premium, relaxed vibe of a coffee break.

## Elevation & Depth

This design system eschews traditional heavy shadows in favor of **Glassmorphism** and **Tonal Layering**.

- **Surface 0:** The Obsidian base (#0F0F0F).
- **Surface 1 (Cards):** Semi-transparent Charcoal (#1A1A1A at 80% opacity) with a `20px` backdrop blur.
- **Surface 2 (Overlays/Modals):** Lighter transparency with a prominent 1px "inner glow" border (White at 10% opacity) to simulate the edge of a glass pane.
- **Interactions:** When an element is pressed, it should "sink" visually by reducing its scale to 98% and increasing the background blur density, rather than relying on shadow changes.

## Shapes

The shape language is consistently **Rounded**, reflecting the organic curves of ceramic mugs and coffee beans. 

Standard components (buttons, input fields, and small cards) use a 0.5rem (8px) radius. Larger layout containers and featured "glass" cards use the `rounded-xl` setting (1.5rem / 24px) to create a soft, friendly silhouette that balances the sharp high-contrast color scheme.

## Components

### Buttons
- **Primary:** Solid Rich Amber background with Espresso text. High-contrast and bold.
- **Secondary:** Ghost style with a 1px Espresso Brown border and Warm Cream text.
- **Glass:** A translucent variant for "Unsubscribe" or "Sign Out" actions, using a background blur and a subtle white border.

### Cards
- Cards must use the Glassmorphism style: 80% opacity charcoal background, 20px backdrop blur, and 24px internal padding. 
- A subtle 1px border using `rgba(245, 245, 220, 0.1)` (Cream at 10%) should be applied to define the edges against the obsidian background.

### Input Fields & Controls
- **Inputs:** Darker than the card background (#0A0A0A) with a 1px border that glows Amber when focused.
- **Switches:** The track should be Espresso Brown when off, and Rich Amber when on. The "thumb" should always be Warm Cream.

### Chips/Tags
- Used for "user replied" counts. These should be small, pill-shaped elements with an Espresso Brown background and Warm Cream text to remain secondary to the main card content.

### Modals
- High-intensity backdrop blur (30px) to completely isolate the user's focus. The modal itself should follow the "Surface 2" elevation rules.