import { Component, OnInit, OnDestroy } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { ProjectsService } from '../../services/projects.service';
import { Project } from '../../models/project';
import { I18nService } from '../../../core/services/i18n.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
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
export class ProjectsComponent implements OnInit, OnDestroy {
  projects!: Project[];
  sectionData: any = {};
  private destroy$ = new Subject<void>();

  constructor(
    private projectsService: ProjectsService,
    private i18nService: I18nService,
    private meta: Meta
  ) {}

  ngOnInit(): void {
    this.loadProjects();
    this.loadSectionData();
    this.setMetaTags();

    // Reload when language changes
    this.i18nService.currentLanguage$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.loadProjects();
        this.loadSectionData();
      });
  }

  private loadProjects() {
    this.projectsService.getProjects()
      .pipe(takeUntil(this.destroy$))
      .subscribe(projects => {
        this.projects = projects;
      });
  }

  private loadSectionData() {
    this.projectsService.getSectionData()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.sectionData = data;
      });
  }

  private setMetaTags() {
    this.meta.updateTag({ name: 'description', content: 'Explora los proyectos personales de Hernando Rumbo, desarrollador de software especializado en .NET y Angular.' });
    this.meta.updateTag({ name: 'keywords', content: 'proyectos, portafolio, desarrollo, .NET, Angular, Hernando Rumbo' });
    this.meta.updateTag({ property: 'og:title', content: 'Proyectos de Hernando Rumbo' });
    this.meta.updateTag({ property: 'og:description', content: 'Descubre los proyectos y trabajos realizados por Hernando Rumbo.' });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
