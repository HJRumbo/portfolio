import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, switchMap, shareReplay } from 'rxjs/operators';
import { About, Certification, Education } from '../models/about';
import { I18nService } from '../../core/services/i18n.service';

@Injectable({
  providedIn: 'root'
})
export class AboutService {
  private aboutData: any;
  private aboutDataSubject = new BehaviorSubject<any>(null);

  constructor(
    private http: HttpClient,
    private i18nService: I18nService
  ) {
    this.loadAboutData();
    // Reload when language changes
    this.i18nService.currentLanguage$.subscribe(() => {
      this.loadAboutData();
    });
  }

  private loadAboutData() {
    this.http.get<any>('assets/json/about.json').subscribe(data => {
      this.aboutData = data;
      this.aboutDataSubject.next(data);
    });
  }

  getAboutMeInfo(): Observable<About> {
    return this.aboutDataSubject.asObservable().pipe(
      map(data => this.transformAboutData(data))
    );
  }

  getSkills(): Observable<string[]> {
    return this.aboutDataSubject.asObservable().pipe(
      map(data => {
        if (!data || !data.skills) return [];
        const skills = data.skills;
        const language = this.i18nService.getCurrentLanguage();
        return skills[language] || skills['es'] || [];
      })
    );
  }

  getEducationList(): Observable<Education[]> {
    return this.aboutDataSubject.asObservable().pipe(
      map(data => {
        if (!data || !data.educations) return [];
        const educations = data.educations;
        const language = this.i18nService.getCurrentLanguage();
        return educations[language] || educations['es'] || [];
      })
    );
  }

  getCertifications(): Observable<Certification[]> {
    return this.aboutDataSubject.asObservable().pipe(
      map(data => {
        if (!data || !data.certifications) return [];
        const certifications = data.certifications;
        const language = this.i18nService.getCurrentLanguage();
        return certifications[language] || certifications['es'] || [];
      })
    );
  }

  getSectionData(): Observable<any> {
    return this.aboutDataSubject.asObservable().pipe(
      map(data => {
        if (!data || !data.section) return {};
        const language = this.i18nService.getCurrentLanguage();
        return data.section[language] || data.section['es'] || {};
      })
    );
  }

  private transformAboutData(data: any): About {
    const language = this.i18nService.getCurrentLanguage();
    return {
      skills: (data?.skills?.[language] || data?.skills?.['es']) ?? [],
      educations: (data?.educations?.[language] || data?.educations?.['es']) ?? [],
      certifications: (data?.certifications?.[language] || data?.certifications?.['es']) ?? []
    };
  }
}
