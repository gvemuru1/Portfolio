# Gradient ASCII

Single-screen, non-scrollable Next.js (App Router) page rendering the React Bits `GradientASCII` WebGL component full-viewport, with `glyphOpacity={0}`.

## Run

```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm start
```

## Tweak

All props live in `app/page.tsx`. Set `glyphOpacity` back to `0.85` to bring the ASCII characters back.
Try `shape="pinch" | "rise" | "eclipse"` and `clickEffect="burst"`.
