---
name: Imperial Heritage
colors:
  surface: '#fff8f7'
  surface-dim: '#e7d6d6'
  surface-bright: '#fff8f7'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fff0f0'
  surface-container: '#fceaea'
  surface-container-high: '#f6e4e4'
  surface-container-highest: '#f0dede'
  on-surface: '#22191a'
  on-surface-variant: '#554243'
  inverse-surface: '#382e2e'
  inverse-on-surface: '#ffeded'
  outline: '#887272'
  outline-variant: '#dbc0c1'
  surface-tint: '#9b414b'
  primary: '#500616'
  on-primary: '#ffffff'
  primary-container: '#6e1e2a'
  on-primary-container: '#f3858f'
  inverse-primary: '#ffb2b7'
  secondary: '#755b00'
  on-secondary: '#ffffff'
  secondary-container: '#fed255'
  on-secondary-container: '#735a00'
  tertiary: '#002c1e'
  on-tertiary: '#ffffff'
  tertiary-container: '#004431'
  on-tertiary-container: '#77b198'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdadb'
  primary-fixed-dim: '#ffb2b7'
  on-primary-fixed: '#40000e'
  on-primary-fixed-variant: '#7d2935'
  secondary-fixed: '#ffe08e'
  secondary-fixed-dim: '#ecc246'
  on-secondary-fixed: '#241a00'
  on-secondary-fixed-variant: '#584400'
  tertiary-fixed: '#b3efd4'
  tertiary-fixed-dim: '#98d3b9'
  on-tertiary-fixed: '#002116'
  on-tertiary-fixed-variant: '#13503c'
  background: '#fff8f7'
  on-background: '#22191a'
  surface-variant: '#f0dede'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 72px
    fontWeight: '700'
    lineHeight: 84px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
  headline-xl:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
  headline-xl-mobile:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-md:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  body-lg:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-caps:
    fontFamily: Manrope
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.1em
  caption:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  container-max-width: 1280px
  gutter: 24px
  margin-mobile: 20px
  margin-desktop: 64px
  section-padding: 120px
---

## Brand & Style

The brand personality is rooted in the "Great Benin" legacy—commanding, prestigious, and culturally profound. It serves as a bridge between the historical royal regalia of the Edo people and the contemporary sophistication of global excellence platforms like the Oscars.

The design style is **Modern Luxury with Editorial Minimalism**. It avoids clutter to allow the prestigious content to breathe, utilizing generous white space and high-contrast typography. Subtle visual nods to Benin bronze textures and coral bead geometry are integrated through thin-line patterns and refined gradients rather than heavy imagery. The emotional response should be one of deep respect, exclusivity, and cultural pride.

## Colors

The palette is anchored by **Royal Burgundy**, symbolizing power and the coral beads of the Oba, and **Rich Gold**, representing the artistic mastery of Benin bronze. The **Ivory/Champagne** background replaces standard white to provide a warmer, more tactile "gallery" feel.

- **Primary (Royal Burgundy):** Used for primary buttons, active states, and brand-heavy headers.
- **Secondary (Rich Gold):** Reserved for rewards, highlights, icons, and borders of distinction.
- **Accents:** Coral Red is used for high-urgency notifications or celebratory flares. Emerald Green provides a sophisticated alternative for success states or specific cultural categories.
- **Gradients:** Use the Soft Metallic Gold gradient sparingly for "Winner" badges or premium call-to-action cards to simulate the shimmer of real metal.

## Typography

This system employs a classic high-contrast pairing. **Playfair Display** provides the authoritative, literary voice of an established institution, used for all headings and pull-quotes. **Manrope** offers a modern, highly legible contrast for long-form reading and functional UI labels.

- **Editorial Flair:** Use `label-caps` for category titles (e.g., "ARTS & CULTURE") placed above `headline-md`.
- **Spacing:** Headings require generous top-margin spacing to maintain the "Elite" aesthetic.
- **Color:** Apply `Royal Burgundy` to display headings to reinforce brand identity, while using `Deep Charcoal` for all body text to ensure maximum readability against the Champagne background.

## Layout & Spacing

The layout philosophy follows a **Fixed-Width Centered Grid** for desktop to mimic the composition of a high-end magazine or gallery catalog. On mobile, the system transitions to a fluid model with increased vertical breathing room.

- **Vertical Rhythm:** Sections should be separated by significant whitespace (`section-padding`) to signify a change in narrative or award category.
- **The Golden Ratio:** Use 1.618 as a guide for the relationship between imagery and text blocks.
- **Pattern Overlay:** Use a subtle, low-opacity (2-5%) geometric Edo pattern (inspired by bronze relief carvings) in the background of wide-spanning sections to break up monochromatic areas.

## Elevation & Depth

To maintain a premium feel, the design avoids heavy, muddy shadows. Hierarchy is instead established through **Tonal Layering** and **Refined Outlines**.

- **Surface Levels:** 
  - Level 0: Champagne Background (`#F8F5EE`).
  - Level 1: Pure White (`#FFFFFF`) cards with a subtle 1px border in Burnished Bronze (`#8D6134`) at 20% opacity.
- **Shadows:** When necessary, use extremely diffused "Ambient" shadows. A light source should feel like it is coming from the top-center, creating a soft glow rather than a hard drop shadow.
- **Glassmorphism:** Use only for mobile navigation overlays or "Quick View" modals, with a high backdrop-blur (20px) and a faint gold-tinted border.

## Shapes

The shape language is primarily **Soft (0.25rem)**. While modern luxury often uses sharp corners, a slight radius prevents the UI from feeling aggressive or dated, providing a "honed" quality similar to polished bronze.

- **Buttons:** Use `rounded-lg` (0.5rem) for a more approachable touch on interactive elements.
- **Avatars/Nominee Portraits:** Use sharp square containers or soft-rounded rectangles. Avoid perfect circles unless representing "The Oba’s Choice" or specific medal-style icons to keep the aesthetic professional and structured.

## Components

### Buttons
- **Primary:** Royal Burgundy background, White Manrope text, 0.5rem radius. On hover, the background deepens and a subtle gold bottom-border appears.
- **Secondary/Ghost:** Transparent background with a 1.5px Gold border. Text is Royal Burgundy.
- **Action Link:** Manrope Bold in Gold with a custom "arrow" icon inspired by an Edo spearhead.

### Cards (Nominee/Award)
Cards should feature a prominent image of the nominee. The category label should be in `label-caps` Gold text. The card title (Nominee Name) uses `headline-md` in Deep Charcoal.

### Input Fields
Inputs use the Champagne background but are defined by a 1px bottom-border only (Editorial Style). When focused, the bottom border transitions to Royal Burgundy with a subtle gold glow.

### Chips/Tags
Used for "Year" or "Category." These should have a Burnished Bronze stroke and use the `caption` typography level.

### Special Component: The "Laurel" Badge
A custom decorative component featuring a metallic gold gradient and a simplified Benin Bronze leopard or ivory mask motif to denote past winners.