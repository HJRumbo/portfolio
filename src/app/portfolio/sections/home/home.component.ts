import { Component, OnInit, OnDestroy } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { HomeService } from '../../services/home.service';
import { I18nService } from '../../../core/services/i18n.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  sectionData: any = {};
  private destroy$ = new Subject<void>();

  constructor(
    private homeService: HomeService,
    private i18nService: I18nService,
    private meta: Meta
  ) {}

  ngOnInit(): void {
    this.loadSectionData();
    this.setMetaTags();

    // Reload when language changes
    this.i18nService.currentLanguage$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.loadSectionData());
  }

  private loadSectionData() {
    this.homeService.getHomeData()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.sectionData = data;
      });
  }

  private setMetaTags() {
    this.meta.updateTag({ name: 'description', content: 'Portafolio de Hernando Rumbo, desarrollador de software con experiencia en .NET y Angular.' });
    this.meta.updateTag({ name: 'keywords', content: 'portafolio, desarrollador, software, .NET, Angular, Hernando Rumbo' });
    this.meta.updateTag({ property: 'og:title', content: 'Hernando Rumbo - Desarrollador de Software' });
    this.meta.updateTag({ property: 'og:description', content: 'Explora mi portafolio y conoce mi experiencia en desarrollo de software.' });
    this.meta.updateTag({ property: 'og:image', content: '/assets/og-image.jpg' });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
