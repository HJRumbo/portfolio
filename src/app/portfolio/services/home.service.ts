import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { I18nService } from '../../core/services/i18n.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private homeDataSubject = new BehaviorSubject<any>(null);

  constructor(
    private http: HttpClient,
    private i18nService: I18nService
  ) {
    this.loadHomeData();
    // Reload when language changes
    this.i18nService.currentLanguage$.subscribe(() => {
      this.loadHomeData();
    });
  }

  private loadHomeData() {
    this.http.get<any>('assets/json/home.json').subscribe(data => {
      this.homeDataSubject.next(data);
    });
  }

  getHomeData(): Observable<any> {
    return this.homeDataSubject.asObservable().pipe(
      map(data => {
        if (!data) return {};
        const language = this.i18nService.getCurrentLanguage();
        return data[language] || data['es'] || {};
      })
    );
  }
}
