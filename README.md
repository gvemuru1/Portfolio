# Guru Charan — Portfolio

A white portfolio workspace built with Next.js and React, with panels for projects, project details, about, experience, and education.

## Run

```sh
npm install
npm run dev
```

Open http://localhost:3000. Use `npm run build` and `npm start` for production.

Desktop panels can be dragged by their dotted handles, minimized, or expanded. Focus a handle and use arrow keys to reposition it. Escape closes expanded panels. Smaller screens show the panels in a scrollable workspace.

Select a project to update its details. Contact and resume links remain at the bottom. Entrance animations respect reduced-motion preferences.

Content lives in `components/PortfolioDesktop.tsx`, with styles in `app/globals.css`. The resume is served from `public/Gurucharan_Vemuru_Resume.pdf`.
