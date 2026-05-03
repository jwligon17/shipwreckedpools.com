import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "var(--color-navy)",
        "navy-deep": "var(--color-navy-deep)",
        ink: "var(--color-ink)",
        "ink-muted": "var(--color-ink-muted)",
        "ink-soft": "var(--color-ink-soft)",
        "light-blue": "var(--color-light-blue)",
        "light-blue-soft": "var(--color-light-blue-soft)",
        pink: "var(--color-pink)",
        "pink-soft": "var(--color-pink-soft)",
        line: "var(--color-line)",
        "surface-alt": "var(--color-surface-alt)",
      },
      boxShadow: {
        card: "0 14px 34px rgba(11, 30, 75, 0.09)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      backgroundImage: {
        "hero-gradient":
          "radial-gradient(820px 380px at 82% -8%, rgba(169, 221, 245, 0.24), transparent 68%), radial-gradient(520px 260px at 20% 0%, rgba(230, 180, 199, 0.2), transparent 72%), linear-gradient(160deg, var(--color-navy-deep) 0%, var(--color-navy) 58%, #133778 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
