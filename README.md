# Stock Pattern Pilot

Stock Pattern Pilot is an AI‑assisted trading dashboard that showcases real‑time market signals, backtesting metrics and advanced screening filters. It is built with **React**, **TypeScript** and **Tailwind CSS** using the Vite bundler.

## Features

- **AI Trading Signals** – View bullish and bearish opportunities with confidence scores and updated prices.
- **Market Overview** – Monitor major indices and sector performance at a glance.
- **Backtest Results** – Review strategy metrics and monthly return charts.
- **Screening Filters** – Experiment with custom criteria such as price, volume and technical indicators.

The interface relies on the shadcn component library and uses Radix primitives for accessibility.

## Technology Stack

- [Vite](https://vitejs.dev/) + [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) and shadcn‑ui components
- [TanStack Query](https://tanstack.com/query/latest) for data fetching

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Start the development server**
   ```bash
   npm run dev
   ```
   The application will be available on `http://localhost:8080`.
3. **Run the linter** (optional)
   ```bash
   npm run lint
   ```
4. **Build for production**
   ```bash
   npm run build
   ```
   The compiled files will be output to `dist/`.

## Deployment

Any static hosting platform that supports client‑side routing can serve the production build. Upload the `dist/` folder to your preferred host (for example, Vercel, Netlify or a custom CDN).

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

---

This project is provided as‑is for demonstration purposes and does not constitute financial advice.
