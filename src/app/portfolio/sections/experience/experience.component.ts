import { Component, OnInit, OnDestroy } from '@angular/core';
import { Project } from '../../models/project';
import { ExperienceService } from '../../services/experience.service';
import { I18nService } from '../../../core/services/i18n.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styles: [
    `
      .section-container {
          padding-top: 100px;
          padding-bottom: 100px;
      }

      .experience-card {
        margin-bottom: 15px;
      }
    `
  ]
})
export class ExperienceComponent implements OnInit, OnDestroy {
  projects!: Project[];
  sectionData: any = {};
  private destroy$ = new Subject<void>();

  constructor(
    private experienceService: ExperienceService,
    private i18nService: I18nService
  ) {}

  ngOnInit(): void {
    this.loadExperiences();
    this.loadSectionData();

    // Reload when language changes
    this.i18nService.currentLanguage$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.loadExperiences();
        this.loadSectionData();
      });
  }

  private loadExperiences() {
    this.experienceService.getExperiences()
      .pipe(takeUntil(this.destroy$))
      .subscribe(projects => {
        this.projects = projects;
      });
  }

  private loadSectionData() {
    this.experienceService.getSectionData()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.sectionData = data;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
