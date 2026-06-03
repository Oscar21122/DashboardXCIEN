/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // tokens shadcn (HSL)
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
        secondary: { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
        muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
        card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
        // paleta XCIEN (raw)
        xbg: "#0A0E0D",
        panel: "#0F1513",
        "panel-2": "#131A18",
        "panel-3": "#161E1B",
        line: "rgba(255,255,255,0.07)",
        "line-2": "rgba(255,255,255,0.12)",
        txt: "#E7EEEA",
        dim: "#9AA6A0",
        faint: "#646E68",
        xgreen: "#3DD63D",
        xblue: "#2DA8FF",
        xamber: "#FBBF24",
        xred: "#FF5A52",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["IBM Plex Sans", "system-ui", "sans-serif"],
        disp: ["Space Grotesk", "IBM Plex Sans", "sans-serif"],
        mono: ["IBM Plex Mono", "ui-monospace", "monospace"],
      },
      keyframes: {
        pulse2: { "0%,100%": { opacity: "1" }, "50%": { opacity: "0.35" } },
      },
      animation: { pulse2: "pulse2 2.4s ease-in-out infinite" },
    },
  },
  plugins: [],
};
