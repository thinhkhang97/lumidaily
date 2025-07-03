# Pomodaily UI & Design Guideline

## 1. Core Design Principles

This guide is built upon the core principles defined in the PRD and inspired by Lumi's story. All design decisions should align with these principles.

- **Mindful & Calming:** The UI must be a source of calm, not stress. It should promote focus and well-being through a clean, uncluttered, and gentle interface.
- **Handwritten & Personal:** The aesthetic should feel human, warm, and personal—like a cherished journal. This is achieved through handwritten fonts, soft textures, and imperfect, organic shapes.
- **Paper-Inspired:** The digital experience should feel tactile and familiar. We use paper textures, soft shadows, and a warm color palette to evoke the feeling of high-quality stationery.
- **Accessible:** Pomodaily is for everyone. All design must adhere to WCAG 2.1 AA standards to ensure usability for people with disabilities, including sufficient color contrast and full keyboard navigability.

## 2. Color Palette

The color palette is warm, soft, and designed to reduce eye strain and create a peaceful atmosphere.

| Role                   | Color Name      | Hex       | Usage                                                                                                             |
| ---------------------- | --------------- | --------- | ----------------------------------------------------------------------------------------------------------------- |
| **Background**         | Parchment Cream | `#F8E9D4` | The primary background color, reminiscent of a journal page.                                                      |
| **Background**         | White           | `#FFF`    | For elevated surfaces or areas needing higher contrast.                                                           |
| **Text**               | Deep Slate      | `#6A6A6A` | The primary color for all body text and standard icons. (Contrast on Parchment Cream is 4.56:1)                   |
| **Primary Action**     | Soft Amber      | `#E89A4F` | For primary buttons, active states, and key interactive elements.                                                 |
| **Secondary / Brand**  | Lumi Lavender   | `#D8BFD8` | Represents Lumi. Use for highlights, illustrations, and moments of celebration. A soft glow effect is encouraged. |
| **Accent (Success)**   | Sage Green      | `#B8D1B8` | For success notifications, confirmations, and completed states.                                                   |
| **Accent (Info/Warn)** | Dusty Rose      | `#D89797` | For gentle warnings, alerts, or informational messages.                                                           |

### Dark Mode

A dark mode theme should be created to provide a comfortable experience in low-light environments. It should follow the same calming principles, using dark, desaturated tones (like deep slate blues or warm grays) instead of pure black, and adapting the primary and accent colors to maintain legibility and a soft feel.

## 3. Typography

The typography is chosen to be legible yet personal, reinforcing the handwritten aesthetic. All fonts are available on [Google Fonts](https://fonts.google.com/).

- **Headings (`h1`, `h2`, `h3`):** [Kalam](https://fonts.google.com/specimen/Kalam)

  - **Weight:** Regular (400)
  - **Style:** Use for primary titles to give a strong, friendly, and handwritten character.

- **Body & UI Text:** [Patrick Hand](https://fonts.google.com/specimen/Patrick+Hand)

  - **Weight:** Regular (400)
  - **Style:** A neat and highly legible handwritten font, perfect for body copy, labels, and component text.

- **Accent / Quotes:** [Handlee](https://fonts.google.com/specimen/Handlee)
  - **Weight:** Regular (400)
  - **Style:** Use sparingly for pull-quotes or special moments to add a touch of personality and variety.

## 4. Spacing & Layout

We use an 8px grid system to ensure consistent and rhythmic layouts. All margins, paddings, and component dimensions should be multiples of 8px.

- **Principle:** "Mindful Spacing."
- **Application:** Embrace generous whitespace to give content breathing room. A spacious layout reduces cognitive load and contributes to a calming experience. Avoid cluttered interfaces at all costs.

## 5. Components

Components should feel tactile and interactive, inspired by physical paper goods.

- **Cards:** Use `Parchment Cream` as the background. Apply a subtle paper texture (a faint noise or fiber pattern) and a soft, diffused `box-shadow` to lift them off the page.
- **Buttons:**
  - **Primary:** Use `Soft Amber` background with `White` text.
  - **Secondary:** Can be outlined with `Deep Slate` text.
  - **Shape:** Slightly rounded corners and a subtle imperfection in the shape to feel more hand-drawn.
- **Inputs:** Keep them minimal. A simple line (`Deep Slate`) under the text on the paper background is preferred over fully boxed inputs.
- **Icons:** Use the [Lucide React](https://lucide.dev/) library as specified. Icons should be simple, line-based, and colored with `Deep Slate`. They should be used to support content, not dominate it.

## 6. Interactions & Animations

Animations should be subtle, gentle, and meaningful. They should enhance the user experience without being distracting.

- **Principle:** "Gentle Interactions."
- **Examples:**
  - A "gentle wobble" or slight scale-up on button hover.
  - Smooth, soft fades for transitions between views.
  - A soft glow animation around elements using `Lumi Lavender`.
- **Timing:** Keep animations short and delightful (e.g., `200ms-300ms` with ease-out timing).
- **Accessibility:** All animations must respect the `prefers-reduced-motion` media query. When this is active, animations should be disabled or reduced to simple cross-fades.
