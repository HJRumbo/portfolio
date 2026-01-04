import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '../models/project';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { I18nService } from '../../core/services/i18n.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private projectsDataSubject = new BehaviorSubject<any>(null);

  constructor(
    private http: HttpClient,
    private i18nService: I18nService
  ) {
    this.loadProjectsData();
    // Reload when language changes
    this.i18nService.currentLanguage$.subscribe(() => {
      this.loadProjectsData();
    });
  }

  private loadProjectsData() {
    this.http.get<any>('assets/json/projects.json').subscribe(data => {
      this.projectsDataSubject.next(data);
    });
  }

  getProjects(): Observable<Project[]> {
    return this.projectsDataSubject.asObservable().pipe(
      map(data => {
        if (!data) return [];
        const language = this.i18nService.getCurrentLanguage();
        const projects = data[language] || data['es'] || [];
        return projects;
      })
    );
  }
}
