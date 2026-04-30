import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        pilot: {
          blue: "#2563eb",
          green: "#16a34a",
          ink: "#152033",
          bg: "#f6f8fb"
        }
      }
    }
  },
  plugins: []
} satisfies Config;
