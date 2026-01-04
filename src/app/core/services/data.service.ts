import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { I18nService, Language } from './i18n.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private aboutDataSubject = new BehaviorSubject<any>(null);
  private projectsDataSubject = new BehaviorSubject<any>(null);
  private experienceDataSubject = new BehaviorSubject<any>(null);

  aboutData$ = this.aboutDataSubject.asObservable();
  projectsData$ = this.projectsDataSubject.asObservable();
  experienceData$ = this.experienceDataSubject.asObservable();

  constructor(
    private http: HttpClient,
    private i18nService: I18nService
  ) {
    // Load data when language changes
    this.i18nService.currentLanguage$.subscribe(() => {
      this.loadAllData();
    });

    // Initial load
    this.loadAllData();
  }

  private loadAllData() {
    this.loadAboutData();
    this.loadProjectsData();
    this.loadExperienceData();
  }

  private loadAboutData() {
    this.http.get<any>('/assets/json/about.json').subscribe(data => {
      const transformed = this.transformData(data);
      this.aboutDataSubject.next(transformed);
    });
  }

  private loadProjectsData() {
    this.http.get<any>('/assets/json/projects.json').subscribe(data => {
      const transformed = this.transformData(data);
      this.projectsDataSubject.next(transformed);
    });
  }

  private loadExperienceData() {
    this.http.get<any>('/assets/json/experiences.json').subscribe(data => {
      const transformed = this.transformData(data);
      this.experienceDataSubject.next(transformed);
    });
  }

  /**
   * Transform language-specific data based on current language
   */
  private transformData(data: any): any {
    const currentLanguage = this.i18nService.getCurrentLanguage();

    if (!data) {
      return data;
    }

    const transformed: any = {};

    for (const [key, value] of Object.entries(data)) {
      if (typeof value === 'object' && value !== null) {
        // Check if it's language-specific data (has es/en properties)
        if ('es' in value && 'en' in value) {
          const langData = value as { [key: string]: any };
          transformed[key] = langData[currentLanguage] || langData['es'];
        } else if (Array.isArray(value)) {
          // Handle array of objects with language-specific fields
          transformed[key] = (value as any[]).map(item => 
            this.transformObject(item, currentLanguage)
          );
        } else {
          transformed[key] = value;
        }
      } else {
        transformed[key] = value;
      }
    }

    return transformed;
  }

  /**
   * Transform individual object fields based on current language
   */
  private transformObject(obj: any, language: Language): any {
    if (!obj || typeof obj !== 'object') {
      return obj;
    }

    const transformed: any = {};

    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === 'object' && value !== null && ('es' in value && 'en' in value)) {
        const langData = value as { es: any; en: any };
        transformed[key] = langData[language] || langData['es'];
      } else {
        transformed[key] = value;
      }
    }

    return transformed;
  }

  /**
   * Get transformed data for current language
   */
  getAboutData(): Observable<any> {
    return this.aboutData$;
  }

  getProjectsData(): Observable<any> {
    return this.projectsData$;
  }

  getExperienceData(): Observable<any> {
    return this.experienceData$;
  }
}
