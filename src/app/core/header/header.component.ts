import { Component, HostListener, OnInit } from '@angular/core';
import { ThemeService, Theme } from '../services/theme.service';
import { I18nService, Language } from '../services/i18n.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  homePath: string = '/';
  homeFragment: string = '';
  activeFragment: string = '';
  
  currentTheme: Theme = 'light';
  currentLanguage: Language = 'es';
  
  menuItems: any[] = [];

  isOverlayOpen = false;
  isNavbarFixed = false;

  constructor(
    private themeService: ThemeService,
    private i18nService: I18nService
  ) {}

  ngOnInit() {
    this.initializeMenu();
    
    // Subscribe to theme changes
    this.themeService.currentTheme$.subscribe(theme => {
      this.currentTheme = theme;
    });

    // Subscribe to language changes
    this.i18nService.currentLanguage$.subscribe(lang => {
      this.currentLanguage = lang;
      this.initializeMenu();
    });
  }

  private initializeMenu() {
    this.menuItems = [
      { title: this.i18nService.getText('home'), fragment: this.homeFragment, key: 'home' },
      { title: this.i18nService.getText('about'), fragment: 'about', key: 'about' },
      { title: this.i18nService.getText('experience'), fragment: 'experience', key: 'experience' },
      { title: this.i18nService.getText('projects'), fragment: 'projects', key: 'projects' },
      { title: this.i18nService.getText('contact'), fragment: 'contact', key: 'contact' }
    ];
  }

  overlay() {
    this.isOverlayOpen = !this.isOverlayOpen;
  }

  toggleDarkMode() {
    this.themeService.toggleDarkMode();
  }

  toggleLanguage() {
    const newLanguage: Language = this.currentLanguage === 'es' ? 'en' : 'es';
    this.i18nService.setLanguage(newLanguage);
  }

  @HostListener('window:scroll') onScroll() {
    if (window.scrollY > 80) {
      this.isNavbarFixed = true;
    } else {
      this.isNavbarFixed = false;
    }
  }

  setActiveFragment(fragment: string) {
    this.activeFragment = fragment;
    this.isOverlayOpen = false;
  }
}
