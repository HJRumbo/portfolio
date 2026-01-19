import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { ThemeService, Theme } from '../services/theme.service';
import { I18nService, Language } from '../services/i18n.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  homePath: string = '/';
  homeFragment: string = '';
  activeFragment: string = '';
  
  currentTheme: Theme = 'light';
  currentLanguage: Language = 'es';
  
  menuItems: any[] = [];
  private destroy$ = new Subject<void>();

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
    this.i18nService.currentLanguage$
      .pipe(takeUntil(this.destroy$))
      .subscribe(lang => {
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

    this.updateActiveSection();
  }

  private updateActiveSection() {
    // Check if we're at the top of the page (home section)
    if (window.scrollY < 300) {
      this.activeFragment = '';
      return;
    }

    const sections = ['about', 'experience', 'projects', 'contact'];
    const headerOffset = 100; // Height offset for header
    const viewportMidpoint = window.scrollY + headerOffset;
    
    let currentActive = '';
    let closestDistance = Infinity;

    // Find the section whose top is closest to the current viewport position
    for (const fragment of sections) {
      const element = document.getElementById(fragment);
      if (!element) continue;

      const elementTop = element.offsetTop;
      const distance = Math.abs(viewportMidpoint - elementTop);

      // Only consider sections that are above or at the current scroll position
      if (elementTop <= viewportMidpoint && distance < closestDistance) {
        closestDistance = distance;
        currentActive = fragment;
      }
    }

    if (currentActive !== this.activeFragment) {
      this.activeFragment = currentActive;
    }
  }

  setActiveFragment(fragment: string) {
    this.activeFragment = fragment;
    this.isOverlayOpen = false;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
