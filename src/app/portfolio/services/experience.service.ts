import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Project } from '../models/project';
import { I18nService } from '../../core/services/i18n.service';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {
  private experiencesDataSubject = new BehaviorSubject<any>(null);

  constructor(
    private http: HttpClient,
    private i18nService: I18nService
  ) {
    this.loadExperiencesData();
    // Reload when language changes
    this.i18nService.currentLanguage$.subscribe(() => {
      this.loadExperiencesData();
    });
  }

  private loadExperiencesData() {
    this.http.get<any>('assets/json/experiences.json').subscribe(data => {
      this.experiencesDataSubject.next(data);
    });
  }

  getExperiences(): Observable<Project[]> {
    return this.experiencesDataSubject.asObservable().pipe(
      map(data => {
        if (!data) return [];
        const language = this.i18nService.getCurrentLanguage();
        const experiences = data[language] || data['es'] || [];
        return experiences;
      })
    );
  }

  getSectionData(): Observable<any> {
    return this.experiencesDataSubject.asObservable().pipe(
      map(data => {
        if (!data || !data.section) return {};
        const language = this.i18nService.getCurrentLanguage();
        return data.section[language] || data.section['es'] || {};
      })
    );
  }
}
