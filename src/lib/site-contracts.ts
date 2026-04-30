export const SECTION_IDS = [
  "intro",
  "work",
  "values",
  "background",
  "references",
  "about",
  "contact",
] as const;

export type SectionId = (typeof SECTION_IDS)[number];

export const THEME_MIN = 0;
export const THEME_MAX = 16;

export const BODY_STATE_CLASSES = {
  loading: "is--loading",
  coverVisible: "cover--is--visible",
  mobileNavVisible: "mobile-nav--is--visible",
  mobileNavTransitioning: "mobile-nav--is--transitioning",
  themeSliderVisible: "theme-slider--is--visible",
} as const;

export const BACKGROUND_ICON_KEYS = [
  "doodod",
  "floatingPointCloud",
  "veer",
  "tojoy",
  "pla",
] as const;

export type BackgroundIconKey = (typeof BACKGROUND_ICON_KEYS)[number];

export function formatThemeClass(index: number) {
  return `theme--${index.toString().padStart(2, "0")}`;
}
