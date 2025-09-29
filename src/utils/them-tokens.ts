export type Vars = Record<string, string>;

export const LIGHT: Vars = {
  "--bg": "#ffffff",
  "--text": "#0f172a",
  "--card": "#ffffff",
  "--border": "#e5e7eb",
  "--primary": "#6366f1",
};

export const DARK: Vars = {
  "--bg": "#0b0f19",
  "--text": "#e5e7eb",
  "--card": "#0f172a",
  "--border": "#263042",
  "--primary": "#8b91ff",
};

// quick brand accents (change only --primary if you want)
export const BRAND: Record<"brandDefault"|"brandBlue"|"brandRose"|"brandEmerald", Partial<Vars>> = {
  brandDefault: {},
  brandBlue:    { "--primary": "#3b82f6" },
  brandRose:    { "--primary": "#fb7185" },
  brandEmerald: { "--primary": "#10b981" },
};
