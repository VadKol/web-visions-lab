### Project Structure

```plaintext
web-visions-lab
├── public/
│   ├── Vadym_Kolomiiets_Resume_FE.pdf [82.99 KB]
│   ├── apple-touch-icon.png [39.29 KB]
│   ├── favicon-cyan.png [8.77 KB]
│   ├── favicon-green.png [10.04 KB]
│   ├── favicon-orange.png [10.45 KB]
│   ├── favicon-pony.png [14.32 KB]
│   ├── favicon.ico [19.90 KB]
│   ├── favicon.png [27.74 KB]
│   ├── og-image.png [84.95 KB]
│   ├── placeholder.svg [3.18 KB]
│   ├── robots.txt [210 bytes]
│   └── sitemap.xml [638 bytes]
├── src/
│   ├── assets/
│   │   ├── avatar-cyber.jpg [1.62 MB]
│   │   ├── avatar-inferno.jpg [1.57 MB]
│   │   ├── avatar-matrix.jpg [1.73 MB]
│   │   ├── avatar-pony.jpg [1.12 MB]
│   │   ├── avatar.jpg [78.48 KB]
│   │   ├── hero-bg-pony.jpg [129.12 KB]
│   │   ├── hero-bg.jpg [222.28 KB]
│   │   ├── project-ecommerce.jpg [106.03 KB]
│   │   ├── project-taskapp.jpg [140.16 KB]
│   │   └── project-weather.jpg [96.86 KB]
│   ├── components/
│   │   ├── ui/
│   │   │   ├── accordion.tsx [1.93 KB]
│   │   │   ├── alert-dialog.tsx [4.21 KB]
│   │   │   ├── alert.tsx [1.51 KB]
│   │   │   ├── aspect-ratio.tsx [143 bytes]
│   │   │   ├── avatar.tsx [1.33 KB]
│   │   │   ├── badge.tsx [1.06 KB]
│   │   │   ├── breadcrumb.tsx [2.62 KB]
│   │   │   ├── button.tsx [1.80 KB]
│   │   │   ├── calendar.tsx [2.50 KB]
│   │   │   ├── card.tsx [1.74 KB]
│   │   │   ├── carousel.tsx [6.10 KB]
│   │   │   ├── chart.tsx [9.75 KB]
│   │   │   ├── checkbox.tsx [1.03 KB]
│   │   │   ├── collapsible.tsx [320 bytes]
│   │   │   ├── command.tsx [4.71 KB]
│   │   │   ├── context-menu.tsx [7.02 KB]
│   │   │   ├── dialog.tsx [3.67 KB]
│   │   │   ├── drawer.tsx [2.87 KB]
│   │   │   ├── dropdown-menu.tsx [7.09 KB]
│   │   │   ├── form.tsx [3.92 KB]
│   │   │   ├── hover-card.tsx [1.17 KB]
│   │   │   ├── input-otp.tsx [2.12 KB]
│   │   │   ├── input.tsx [799 bytes]
│   │   │   ├── label.tsx [696 bytes]
│   │   │   ├── menubar.tsx [7.68 KB]
│   │   │   ├── navigation-menu.tsx [4.91 KB]
│   │   │   ├── pagination.tsx [2.62 KB]
│   │   │   ├── popover.tsx [1.21 KB]
│   │   │   ├── progress.tsx [765 bytes]
│   │   │   ├── radio-group.tsx [1.41 KB]
│   │   │   ├── resizable.tsx [1.66 KB]
│   │   │   ├── scroll-area.tsx [1.57 KB]
│   │   │   ├── select.tsx [5.44 KB]
│   │   │   ├── separator.tsx [698 bytes]
│   │   │   ├── sheet.tsx [4.10 KB]
│   │   │   ├── sidebar.tsx [22.30 KB]
│   │   │   ├── skeleton.tsx [234 bytes]
│   │   │   ├── slider.tsx [1.04 KB]
│   │   │   ├── sonner.tsx [877 bytes]
│   │   │   ├── switch.tsx [1.12 KB]
│   │   │   ├── table.tsx [2.63 KB]
│   │   │   ├── tabs.tsx [1.85 KB]
│   │   │   ├── textarea.tsx [751 bytes]
│   │   │   ├── toast.tsx [4.69 KB]
│   │   │   ├── toaster.tsx [730 bytes]
│   │   │   ├── toggle-group.tsx [1.67 KB]
│   │   │   ├── toggle.tsx [1.38 KB]
│   │   │   ├── tooltip.tsx [1.13 KB]
│   │   │   └── use-toast.ts [82 bytes]
│   │   ├── CommandPalette.tsx [8.31 KB]
│   │   ├── CursorTrail.tsx [2.46 KB]
│   │   ├── CyberRain.tsx [2.26 KB]
│   │   ├── Footer.tsx [2.04 KB]
│   │   ├── GlitchText.tsx [1.81 KB]
│   │   ├── HeroText.tsx [5.67 KB]
│   │   ├── KonamiEasterEgg.tsx [3.06 KB]
│   │   ├── MemoryGame.tsx [9.42 KB]
│   │   ├── MorphTransition.tsx [2.67 KB]
│   │   ├── NavLink.tsx [751 bytes]
│   │   ├── Navbar.tsx [5.64 KB]
│   │   ├── PageLoader.tsx [2.16 KB]
│   │   ├── PageTransition.tsx [1.58 KB]
│   │   ├── Parallax.tsx [750 bytes]
│   │   ├── Parallax3DScene.tsx [1.32 KB]
│   │   ├── PixelText.tsx [1.70 KB]
│   │   ├── ScrollProgressBar.tsx [700 bytes]
│   │   ├── ScrollToTop.tsx [1.13 KB]
│   │   ├── SnakeGame.tsx [11.87 KB]
│   │   ├── SoundToggle.tsx [717 bytes]
│   │   ├── TerminalTyping.tsx [2.54 KB]
│   │   ├── TetrisGame.tsx [15.71 KB]
│   │   ├── ThemeSwitcher.tsx [5.08 KB]
│   │   ├── ThemedAvatar.tsx [9.84 KB]
│   │   ├── TiltCard.tsx [1.63 KB]
│   │   ├── TypingGame.tsx [10.22 KB]
│   │   └── TypingRoles.tsx [1.92 KB]
│   ├── config/
│   │   └── endpoints.ts [89 bytes]
│   ├── contexts/
│   │   ├── SoundContext.tsx [2.57 KB]
│   │   └── ThemeContext.tsx [2.13 KB]
│   ├── data/
│   │   └── portfolio.ts [6.17 KB]
│   ├── hooks/
│   │   ├── use-mobile.tsx [576 bytes]
│   │   ├── use-toast.ts [3.84 KB]
│   │   ├── use3DParallax.ts [2.96 KB]
│   │   └── useKeyboardNav.ts [978 bytes]
│   ├── lib/
│   │   ├── favorites.ts [1.22 KB]
│   │   ├── gameStats.ts [2.25 KB]
│   │   └── utils.ts [169 bytes]
│   ├── pages/
│   │   ├── About.tsx [15.34 KB]
│   │   ├── Blog.tsx [17.10 KB]
│   │   ├── Contact.tsx [13.31 KB]
│   │   ├── Home.tsx [14.14 KB]
│   │   ├── Index.tsx [164 bytes]
│   │   ├── Minigames.tsx [4.74 KB]
│   │   ├── NotFound.tsx [6.32 KB]
│   │   └── Projects.tsx [11.67 KB]
│   ├── test/
│   │   ├── example.test.ts [143 bytes]
│   │   └── setup.ts [353 bytes]
│   ├── App.css [606 bytes]
│   ├── App.tsx [4.08 KB]
│   ├── index.css [7.23 KB]
│   ├── main.tsx [161 bytes]
│   └── vite-env.d.ts [38 bytes]
├── README.md [2.05 KB]
├── bun.lock [187.46 KB]
├── bun.lockb [239.64 KB]
├── components.json [414 bytes]
├── eslint.config.js [765 bytes]
├── index.html [3.65 KB]
├── package-lock.json [369.23 KB]
├── package.json [2.90 KB]
├── postcss.config.js [81 bytes]
├── tailwind.config.ts [4.18 KB]
├── tsconfig.app.json [680 bytes]
├── tsconfig.json [396 bytes]
├── tsconfig.node.json [481 bytes]
├── vite.config.ts [1.00 KB]
└── vitest.config.ts [395 bytes]
```


### Summary

```plaintext
Root Folder: web-visions-lab
Total Folders: 12
Total Files: 139
File Types:
  - .lock Files: 1
  - .lockb Files: 1
  - .json Files: 6
  - .js Files: 2
  - .html Files: 1
  - .md Files: 1
  - .ts Files: 15
  - .png Files: 7
  - .ico Files: 1
  - .svg Files: 1
  - .txt Files: 1
  - .xml Files: 1
  - .pdf Files: 1
  - .css Files: 2
  - .tsx Files: 88
  - .jpg Files: 10
Largest File: avatar-matrix.jpg [1.73 MB]
Smallest File: vite-env.d.ts [38 bytes]
Total Project Size: 8.25 MB
Ignored Files and Folders:
  - None
```
