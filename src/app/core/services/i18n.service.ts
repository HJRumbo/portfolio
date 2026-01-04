import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type Language = 'es' | 'en';

@Injectable({
  providedIn: 'root'
})
export class I18nService {
  private currentLanguageSubject: BehaviorSubject<Language>;
  public currentLanguage$: Observable<Language>;

  private translations: { [key: string]: { es: string; en: string } } = {};

  constructor() {
    const savedLanguage = this.getSavedLanguage();
    this.currentLanguageSubject = new BehaviorSubject<Language>(savedLanguage);
    this.currentLanguage$ = this.currentLanguageSubject.asObservable();
    this.loadTranslations();
  }

  /**
   * Get the saved language from localStorage or browser default
   */
  private getSavedLanguage(): Language {
    const saved = localStorage.getItem('language') as Language | null;
    if (saved) {
      return saved;
    }

    const browserLang = navigator.language.toLowerCase();
    return browserLang.startsWith('es') ? 'es' : 'en';
  }

  /**
   * Set the current language
   */
  setLanguage(language: Language): void {
    this.currentLanguageSubject.next(language);
    localStorage.setItem('language', language);
  }

  /**
   * Get the current language
   */
  getCurrentLanguage(): Language {
    return this.currentLanguageSubject.getValue();
  }

  /**
   * Get translated text
   */
  getText(key: string): string {
    const lang = this.getCurrentLanguage();
    const translation = this.translations[key];
    
    if (!translation) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }

    return translation[lang] || translation['es'] || key;
  }

  /**
   * Get translated text observable
   */
  getText$(key: string): Observable<string> {
    return new Observable(observer => {
      observer.next(this.getText(key));
      
      this.currentLanguage$.subscribe(() => {
        observer.next(this.getText(key));
      });
    });
  }

  /**
   * Load common translations
   */
  private loadTranslations(): void {
    this.translations = {
      'home': { es: 'Inicio', en: 'Home' },
      'about': { es: 'Sobre mi', en: 'About' },
      'experience': { es: 'Experiencia', en: 'Experience' },
      'projects': { es: 'Proyectos', en: 'Projects' },
      'contact': { es: 'Contacto', en: 'Contact' },
      'skills': { es: 'Habilidades', en: 'Skills' },
      'education': { es: 'Educación', en: 'Education' },
      'certifications': { es: 'Certificaciones', en: 'Certifications' },
      'language': { es: 'Idioma', en: 'Language' },
      'theme': { es: 'Tema', en: 'Theme' },
      'light_mode': { es: 'Modo Claro', en: 'Light Mode' },
      'dark_mode': { es: 'Modo Oscuro', en: 'Dark Mode' },
    };
  }

  /**
   * Add custom translation
   */
  addTranslation(key: string, es: string, en: string): void {
    this.translations[key] = { es, en };
  }

  /**
   * Add multiple translations
   */
  addTranslations(translations: { [key: string]: { es: string; en: string } }): void {
    this.translations = { ...this.translations, ...translations };
  }
}
