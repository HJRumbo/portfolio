import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private currentThemeSubject: BehaviorSubject<Theme>;
  public currentTheme$: Observable<Theme>;

  constructor() {
    const savedTheme = this.getSavedTheme();
    this.currentThemeSubject = new BehaviorSubject<Theme>(savedTheme);
    this.currentTheme$ = this.currentThemeSubject.asObservable();
    this.applyTheme(savedTheme);
  }

  /**
   * Get the saved theme from localStorage or system preference
   */
  private getSavedTheme(): Theme {
    const saved = localStorage.getItem('theme') as Theme | null;
    if (saved) {
      return saved;
    }

    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }

    return 'light';
  }

  /**
   * Toggle between light and dark theme
   */
  toggleDarkMode(): void {
    const current = this.currentThemeSubject.getValue();
    const newTheme: Theme = current === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  /**
   * Set a specific theme
   */
  setTheme(theme: Theme): void {
    this.applyTheme(theme);
    this.currentThemeSubject.next(theme);
  }

  /**
   * Get the current theme
   */
  getCurrentTheme(): Theme {
    return this.currentThemeSubject.getValue();
  }

  /**
   * Check if dark mode is enabled
   */
  isDarkMode(): boolean {
    return this.getCurrentTheme() === 'dark';
  }

  /**
   * Apply theme to the document
   */
  private applyTheme(theme: Theme): void {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }
}
