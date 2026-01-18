import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { I18nService } from '../../core/services/i18n.service';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private contactDataSubject = new BehaviorSubject<any>(null);

  constructor(
    private http: HttpClient,
    private i18nService: I18nService
  ) {
    this.loadContactData();
    // Reload when language changes
    this.i18nService.currentLanguage$.subscribe(() => {
      this.loadContactData();
    });
  }

  private loadContactData() {
    this.http.get<any>('assets/json/contact.json').subscribe(data => {
      this.contactDataSubject.next(data);
    });
  }

  getContactData(): Observable<any> {
    return this.contactDataSubject.asObservable().pipe(
      map(data => {
        if (!data) return {};
        const language = this.i18nService.getCurrentLanguage();
        return data[language] || data['es'] || {};
      })
    );
  }
}
