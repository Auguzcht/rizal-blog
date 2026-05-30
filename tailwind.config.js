import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        parchment: {
          50: "#FBF7EC",
          100: "#F4EBD3",
          200: "#E8DABC",
        },
        sepia: {
          400: "#B08A5B",
          600: "#7A5A3A",
        },
        ink: {
          700: "#3A2A1F",
          900: "#1E1611",
        },
        blood: {
          600: "#8B1E2A",
        },
        gold: {
          500: "#B8860B",
        },

        // shadcn semantic mapping
        primary: {
          DEFAULT: "#3A2A1F",
          foreground: "#FBF7EC",
        },
        secondary: {
          DEFAULT: "#F4EBD3",
          foreground: "#1E1611",
        },
        accent: {
          DEFAULT: "#B8860B",
          foreground: "#1E1611",
        },
        destructive: {
          DEFAULT: "#8B1E2A",
          foreground: "#FBF7EC",
        },
        muted: {
          DEFAULT: "#E8DABC",
          foreground: "#7A5A3A",
        },
        border: "#B08A5B",
      },
      fontFamily: {
        display: ['"Playfair Display"', "Georgia", "serif"],
        "serif-i": ['"Cormorant Garamond"', "Georgia", "serif"],
        body: ['"Crimson Pro"', "Georgia", "serif"],
        script: ["Tangerine", "cursive"],
        caption: ['"Playfair Display"', "Georgia", "serif"],
      },
      boxShadow: {
        paper: "0 8px 32px -8px rgba(30, 22, 17, 0.12)",
        "paper-lg": "0 16px 48px -12px rgba(30, 22, 17, 0.16)",
      },
    },
  },
  plugins: [],
} satisfies Config;
