import { Injectable } from '@angular/core';

export type AppTheme = 'dark' | 'morning-latte' | 'sunrise-roast' | 'dark-blue';

export const APP_THEMES: { id: AppTheme; label: string }[] = [
  { id: 'dark', label: 'Obsidian Brew' },
  { id: 'morning-latte', label: 'Morning Latte' },
  { id: 'sunrise-roast', label: 'Sunrise Roast' },
  { id: 'dark-blue', label: 'Nocturnal Amber' },
];

const STORAGE_KEY = 'app-theme';
const DEFAULT_THEME: AppTheme = 'dark';

const THEME_META_COLORS: Record<AppTheme, string> = {
  dark: '#131313',
  'morning-latte': '#fff5ec',
  'sunrise-roast': '#eefcfd',
  'dark-blue': '#001526',
};

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private _theme: AppTheme = DEFAULT_THEME;

  get theme(): AppTheme {
    return this._theme;
  }

  get themes(): typeof APP_THEMES {
    return APP_THEMES;
  }

  init(): void {
    this._theme = this.readStoredTheme();
    this.apply(this._theme);
  }

  setTheme(theme: AppTheme): void {
    if (theme === this._theme) {
      return;
    }
    this._theme = theme;
    this.apply(theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* ignore quota / private mode */
    }
  }

  private readStoredTheme(): AppTheme {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'light') {
        return 'morning-latte';
      }
      if (stored && APP_THEMES.some((t) => t.id === stored)) {
        return stored as AppTheme;
      }
    } catch {
      /* ignore */
    }
    return DEFAULT_THEME;
  }

  private apply(theme: AppTheme): void {
    document.documentElement.setAttribute('mode', theme);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute('content', THEME_META_COLORS[theme]);
    }
  }
}
