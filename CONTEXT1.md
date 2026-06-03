# Technical Specification & Context Architecture Document

**Target Component:** `ContactsApp.tsx` (Next.js App Router, TypeScript, Tailwind CSS, Anime.js v4)

**System Designation:** Immersive Personal Contacts Interface

---

## 1. Project Vision & Identity

The application is a high-fidelity, premium personal contacts platform that blends high-end industrial design aesthetics with interactive motion physics.

### Visual Identity: "Ethereal Glass"

* **Foundation:** Built entirely over a pure OLED black backdrop (`#050505`) to eliminate screen bloom, heighten typography metrics, and enhance tactile glowing layers.
* **Tactile Dual-Bezels:** Structural design shuns conventional drop shadows in favor of multi-layered nested borders (`bezel-outer` and `bezel-inner`). This creates a sharp, physical glass-sheet or machined hardware casing behavior.
* **Dynamic Backdrop Contrast:** Features subtle, premium backdrop assets (JoJo's Bizarre Adventure graphic overlays) sitting at a low resting opacity (`0.03`) that transitions smoothly to (`0.08`) on hover contexts to generate depth without impeding structural reading zones.

---

## 2. Advanced Motion, Parallax & Interaction Physics

### A. Viewport-Wide Camera Parallax Mechanics

When active, the entire application viewport acts as a 3D camera staging environment, executing continuous spatial changes powered by **Anime.js v4**.

* **Scaling Boundary Factor:** The layout container (`mainWrapperRef`) is permanently bound to an exact layout configuration of `scale(0.85)` during tracking operations. This creates an intentional dimensional perimeter, ensuring the 3D edge boundaries never clip through the physical screen edge when tilting.
* **Mouse-Coordinate Tracking (Desktop/PC):** Listens globally on the `window` grid. It calculates normalized vector offsets from the exact viewport center (`dx`, `dy`) across a range of `[-1, 1]`.
* **Hardware Gyroscope Tracking (Mobile/Smartphones):** Hooks directly into the device's hardware accelerometer via the native `DeviceOrientationEvent` interface (accounting for Safari's explicit client permission handshake). It maps `gamma` (roll) and `beta` (pitch) physics onto matching rotational values.

### B. Dynamic Velocity Dampening (Speed Metric)

The interactive system features a user-tunable Velocity Regulator mapped across a linear percentage slider value (`1%` to `100%`).

* **Interpolation Formula:** The interface converts slider percentages into precise Anime.js ease durations using a custom linear interpolation equation:

$$\text{Duration (ms)} = \text{Math.round}\left(25 + (\text{SpeedPercent} - 1) \times \frac{375}{99}\right)$$


* **Result Matrix:** At $1\%$, reactions operate at a ultra-responsive $25\text{ms}$ velocity curve. At $100\%$, tracking eases smoothly across a deliberate $400\text{ms}$ cubic window.

### C. System Architecture State Matrix

The layout enforces strict architectural logic coordinating user configurations, component rendering states, and physics loop rules:

| Operational State | UI Toggle State | Control Box Layout (PC) | Control Box Layout (Mobile) | Engine Invariants & Scale Hooks |
| --- | --- | --- | --- | --- |
| **Parallax Engine ON** | Active (Pure White over Black Casing) | Disabled / Visual Opacity Dimming (`opacity-40`) | Disabled / Visual Opacity Dimming (`opacity-40`) | Continuous tracking loop active; layout locked firmly at `scale(0.85)`. |
| **Parallax Engine OFF** | Inactive (Dark Gray / Translucent) | Enabled / High Visual Opacity Focus (`opacity-100`) | Enabled / High Visual Opacity Focus (`opacity-100`) | Tracking calculations immediately freeze; positions ease back to center ($0$, $0$) while maintaining the structural `scale(0.85)` design layer. |

---

## 3. Solved Engineering Vulnerabilities & Critical Edge Cases

Any incoming developer or agent modifications **must not reintroduce** these critical, corrected runtime bugs:

### A. The Scroll-Decoupled Light Bleed (Fixed)

* **Vulnerability:** Moving the mouse cursor over a card and scrolling the viewport caused the interactive background highlight (`radial-gradient` tracking via CSS variables `--card-x` and `--card-y`) to detach and freeze. The light would stay glued to the initial screen pixel space rather than moving with the scrolling contact card.
* **Resolution:** Implemented a unified global pointer position cache (`lastPointerRef`) that tracks running mouse positions. A custom browser window event listener (`update-orb-scroll`) continuously dispatches scroll corrections to recalculate and reposition the active hover highlights in real time.

### B. The Text Selection Tilt Freeze (Fixed)

* **Vulnerability:** On PC viewports, clicking and dragging across text layers to copy values triggered high-frequency `pointermove` inputs. Because standard move tracking ran blindly, releasing the cursor left Anime.js transforms completely frozen at skewed angles, requiring a text selection refresh to unlock.
* **Resolution:** Modified the global motion loop with a strict button interaction block statement: `if (e.buttons !== 0) return;`. Parallax updates are completely skipped if a mouse button is actively held down during desktop window pointer translations.

### C. Viewport Departure Reset (Fixed)

* **Vulnerability:** Moving the mouse completely out of the active operating system window left the cards awkwardly locked at severe perspective angles.
* **Resolution:** Placed an outer `onPointerLeave` observer callback directly over the primary window view container block. Exiting the browser viewport bounds instantly triggers an absolute normalization routine that returns the 3D layers safely back to origin.

### D. Multi-Device Layout Overlap (Fixed)

* **Vulnerability:** Desktop layouts utilized a floating control system pinned permanently to the bottom-right viewport layer. On mobile screens, this floating pane directly clipped through and obscured the bottom social contact cards, rendering buttons unclickable.
* **Resolution:** Re-architected the layout workflow via Tailwind responsive breakpoint queries:
* **Desktop Workflow (`md:` and up):** The slider box layout stands vertically (`-rotate-90` input configuration) and floats cleanly inside the viewport corner.
* **Mobile Mobile Workflow:** The floating corner box disappears. The structural tools convert to a native horizontal row sequence inline, settling comfortably beneath the lowest card layout tier. The slider runs natively horizontally, with the activation toggle sitting directly below it in a stacked formation to ensure pristine touch targets.



---

## 4. Source Files Inventory & Project Framework

### A. `globals.css`

Declares the global premium dark token values, sleek scrollbar overlays, and keyframe entrance motions (`fadeUp`). Maps incoming `--card-x` and `--card-y` vector inputs onto real-time structural gradients via custom micro-bevel classes.

### B. `ContactsApp.tsx`

The primary operational engine. Orchestrates device permission queries, mouse/gyroscope listeners, text reveal descramblers via standard `requestAnimationFrame` hooks, and handles structural conditional shifts cleanly across desktop and mobile form factors.

---

## 5. Architectural Implementation Directive for the Next Agent

When extending this component or modifying visual details, you **must adhere to these development invariants**:

1. **Do Not Touch Scale on Toggle:** Toggling the parallax engine off should never alter the main container scale factor. It must remain structurally fixed at `0.85`. Only clear the horizontal and vertical rotation coordinates.
2. **Maintain Pointer Type Segregation:** Gyroscope handlers and mouse-move calculation loops must remain isolated via `e.pointerType` checks. Mobile touch gestures over background canvases must never update desktop mouse-move calculations.
3. **Preserve Responsive Flow:** Any stylistic adjustments made to the floating control panel must separately configure the `hidden md:fixed` desktop panel and the static inline `mt-8 md:hidden` mobile assembly block.