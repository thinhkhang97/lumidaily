# Pomodaily App UI - Revised Design

## Layout Structure

```
┌─────────────────────────────────────────────────────────────┐
│ ┌─────────┐                      ┌────┐┌─────┐┌─────┐┌────┐ │
│ │   Logo  │                      │Task││Insig││ Set ││User│ │
│ └─────────┘                      └────┘└─────┘└─────┘└────┘ │
├─────────────────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────────────────┐ │
│ │                  Inspirational Quote                    │ │
│ └─────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│ ┌───────────────────────────────────┐  ┌─────────────────┐ │
│ │                                   │  │                 │ │
│ │                                   │  │                 │ │
│ │                                   │  │                 │ │
│ │           Task Table              │  │    Calendar     │ │
│ │                                   │  │                 │ │
│ │                                   │  │                 │ │
│ │                                   │  │                 │ │
│ │                                   │  │                 │ │
│ │                                   │  │                 │ │
│ └───────────────────────────────────┘  └─────────────────┘ │
└─────────────────────────────────────────────────────────────┘

// When user starts a Pomodoro session:
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                                                             │
│                      ┌─────────────┐                        │
│                      │             │                        │
│                      │   25:00     │                        │
│                      │             │                        │
│                      │  Task Name  │                        │
│                      │             │                        │
│                      └─────────────┘                        │
│                                                             │
│                  ┌─────┐     ┌─────┐                        │
│                  │Pause│     │Skip │                        │
│                  └─────┘     └─────┘                        │
│                                                             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Key Elements

### 1. Top Navigation Bar

- **Left Side:**
  - Logo with "Pomodaily" text in Kalam font
  - Small Lumi sprite icon next to the logo
- **Right Side:**
  - Simple icon-based navigation with Deep Slate icons
  - Tasks icon
  - Insights icon
  - Settings icon
  - User profile icon
- **Background:** Parchment Cream (#F8E9D4) with subtle paper texture

### 2. Inspirational Quote

- Simple, elegant card with paper texture
- Quote displayed in Handlee font (no typewriter effect)
- Soft shadow to lift it from the background
- Daily rotating mindfulness or productivity quotes

### 3. Main Content Area (Two-Panel Layout)

#### Task Table (Left, ~70% width)

- Paper-textured card with soft shadow
- Column headers in Kalam font
- Columns:
  - Checkbox (custom styled with Sage Green for completed tasks)
  - Task name
  - Priority indicator (subtle color dots)
  - Estimated Pomodoros (small tomato icons)
  - Completed Pomodoros (filled tomato icons)
  - Actions (edit, delete)
- Add task button with Soft Amber color
- Lumi appears as a glowing cursor when hovering over the add task button
- Pagination or infinite scroll for longer task lists

#### Calendar (Right, ~30% width)

- Paper-textured card with soft shadow
- Month view calendar with current date highlighted
- Days with scheduled tasks have subtle indicators
- Clicking a day filters the task table to show that day's tasks
- Handwritten-style date numbers using Patrick Hand font
- Soft Amber highlight for current day

### 4. Pomodoro Session Modal (Full-screen overlay)

- Appears when a Pomodoro session is started
- Semi-transparent Parchment Cream background with paper texture
- Large, centered timer display with:
  - Current time remaining in large Kalam font
  - Current task name displayed below timer
  - Session type indicator (Focus/Break)
- Control buttons with Soft Amber (primary) and outlined Deep Slate (secondary):
  - Pause/Resume button
  - Skip button (to end session early)
- Lumi animation around the timer (subtle lavender glow)
- Optional ambient sound controls
- Gentle animation for timer countdown
- Easy dismiss with ESC key or clicking outside (with confirmation if in active session)

## Visual Design Elements

### Colors

- **Primary Background:** Parchment Cream (#F8E9D4)
- **Elevated Elements:** White (#FFF)
- **Text:** Deep Slate (#6A6A6A)
- **Primary Actions:** Soft Amber (#E89A4F)
- **Lumi Elements:** Lumi Lavender (#D8BFD8) with subtle glow effect
- **Success States:** Sage Green (#B8D1B8)
- **Alerts/Info:** Dusty Rose (#D89797)

### Typography

- **Headings & Nav Items:** Kalam (400 weight)
- **Body Text & UI:** Patrick Hand (400 weight)
- **Quotes & Accents:** Handlee (400 weight)

### Textures & Effects

- Subtle paper texture overlay on all cards and backgrounds
- Soft, diffused shadows to create depth
- Gentle rounded corners on all elements
- Slightly imperfect edges for handcrafted feel

### Animations & Interactions

- Gentle hover effects on interactive elements
- Smooth transitions between states
- Soft glow effect around Lumi elements
- Modal appears with a gentle fade-in animation

## Lumi Integration

- Appears as a small paper sprite in the corner during idle moments
- Provides context-appropriate encouragement:
  - When starting a task: "Let's focus on this task together!"
  - When completing a task: "Well done! One step closer to your goals."
  - During breaks: "Time to rest and recharge."
- Can be minimized for distraction-free mode

## Accessibility Considerations

- All color combinations meet WCAG 2.1 AA contrast requirements
- Full keyboard navigation support
- Proper semantic HTML structure
- Reduced motion option for animations
- Screen reader friendly labels and structure
