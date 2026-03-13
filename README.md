# Web Visions Lab

**Web Visions Lab** is my personal portfolio website and interactive Single Page Application (SPA) built with **React + Vite + TypeScript**.
It showcases modern UI, custom hooks, animations, and mini-games, highlighting my frontend skills.

> Some base UI components were generated with Lovable. All SPA logic, routing, custom hooks, forms, and interactive features were implemented and integrated manually by me.

---

## 🛠 Tech Stack

- **Frontend:** React, TypeScript, Vite
- **Styling:** Tailwind CSS
- **State Management:** React Context (ThemeContext, SoundContext)
- **Custom Hooks:** use3DParallax, useKeyboardNav, useMobile, useToast
- **Components:** Accordion, Carousel, Modal, Table, Badge, Tooltip, and more
- **Testing:** Vitest
- **Deployment:** Vercel

---

## ⚡ Features

- SPA with multiple pages: `Home`, `About`, `Projects`, `Minigames`, `Contact`
- **Mini-games:** MemoryGame, SnakeGame, TetrisGame, TypingGame
- **Theme switcher** implemented with Context API
- **Custom hooks** for 3D parallax, keyboard navigation, mobile detection, toast notifications
- **Reusable UI components**: buttons, modals, tables, forms, etc.
- Page transitions, parallax effects, and cursor animations
- Fully responsive for desktop and mobile devices

---

## 📂 Project Structure

```plaintext
src/
├─ assets/          # images, icons, and avatars
├─ components/      # UI components + feature-specific components (Minigames, HeroText, etc.)
├─ config/          # endpoints and constants
├─ contexts/        # ThemeContext, SoundContext
├─ data/            # static data (portfolio items)
├─ hooks/           # custom React hooks
├─ lib/             # utilities and business logic
├─ pages/           # SPA pages
├─ test/            # basic tests
├─ App.tsx          # root component
└─ main.tsx         # entry point

Organized following the feature/component separation principle, making it scalable and easy to maintain.

🎯 Live Demo

Visit the live site

All interactive features and mini-games are fully functional in the live demo.

💻 Role & Contributions

Implemented SPA routing, custom hooks, theme switcher, forms, and UI integration

Integrated mini-games and interactive animations

Optimized assets and responsive layouts

Partially generated base UI components with Lovable, manually enhanced logic and interactivity

📈 Next Steps / Future Improvements

Integrate dynamic API for portfolio items

Improve state management for larger datasets

Expand testing coverage for all components

Implement lazy loading for performance optimization

📌 Notes

Developed to demonstrate my frontend development skills and SPA architecture knowledge

Serves as a strong portfolio project for strong junior / entry-level middle frontend positions


---