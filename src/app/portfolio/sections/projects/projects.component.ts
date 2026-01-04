import { Component, OnInit, OnDestroy } from '@angular/core';
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
  private destroy$ = new Subject<void>();

  constructor(
    private projectsService: ProjectsService,
    private i18nService: I18nService
  ) {}

  ngOnInit(): void {
    this.loadProjects();

    // Reload when language changes
    this.i18nService.currentLanguage$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.loadProjects());
  }

  private loadProjects() {
    this.projectsService.getProjects()
      .pipe(takeUntil(this.destroy$))
      .subscribe(projects => {
        this.projects = projects;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
