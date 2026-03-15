import { Component, OnInit, OnDestroy } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Certification, Education } from '../../models/about';
import { AboutService } from '../../services/about.service';
import { I18nService } from '../../../core/services/i18n.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit, OnDestroy {

  skills!: string[];
  educationList!: Education[];
  certifications!: Certification[];
  sectionData: any = {};
  private destroy$ = new Subject<void>();

  constructor(
    private aboutService: AboutService,
    public i18nService: I18nService,
    private meta: Meta
  ) { }

  ngOnInit(): void {
    this.loadData();
    this.setMetaTags();

    // Reload data when language changes
    this.i18nService.currentLanguage$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.loadData());
  }

  private loadData() {
    this.getSkills();
    this.getEducationList();
    this.getCertifications();
    this.loadSectionData();
  }

  private loadSectionData() {
    this.aboutService.getSectionData()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.sectionData = data;
      });
  }

  getSkills() {
    this.aboutService.getSkills()
      .pipe(takeUntil(this.destroy$))
      .subscribe(skills => this.skills = skills);
  }

  getEducationList() {
    this.aboutService.getEducationList()
      .pipe(takeUntil(this.destroy$))
      .subscribe(educationList => this.educationList = educationList);
  }

  getCertifications() {
    this.aboutService.getCertifications()
      .pipe(takeUntil(this.destroy$))
      .subscribe(certifications => this.certifications = certifications);
  }

  private setMetaTags() {
    this.meta.updateTag({ name: 'description', content: 'Conoce más sobre Hernando Rumbo: su educación, habilidades y certificaciones como desarrollador de software.' });
    this.meta.updateTag({ name: 'keywords', content: 'acerca de, educación, habilidades, certificaciones, Hernando Rumbo' });
    this.meta.updateTag({ property: 'og:title', content: 'Acerca de Hernando Rumbo' });
    this.meta.updateTag({ property: 'og:description', content: 'Descubre la formación académica y experiencia profesional de Hernando Rumbo.' });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}


