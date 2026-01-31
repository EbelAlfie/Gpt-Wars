import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        "pulse-scale" : "pulse-scale 0.5s ease-in-out infinite",
        "blink": "blink 0.5s step-end infinite",
      },
      keyframes: {
        "pulse-scale": { 
          "100%, 0%": {
            transform: "scale(1)"
          },
          "50%": {
            transform: "scale(1.03)"
          }
        },
        "blink": { 
          "100%, 0%": { opacity: "100%" },
          "50%": { opacity: "0%" }
        }
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
} satisfies Config;