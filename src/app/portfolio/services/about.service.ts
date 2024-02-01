import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { About, Certification, Education } from '../models/about';

@Injectable({
  providedIn: 'root'
})
export class AboutService {

  constructor(private http: HttpClient) { }

  getAboutMeInfo(): Observable<About> {
    return this.http.get<About>('assets/json/about.json');
  }

  getSkills(): Observable<string[]> {
    return this.http.get<string[]>('assets/json/about/skills.json');
  }

  getEducationList(): Observable<Education[]> {
    return this.http.get<Education[]>('assets/json/about/educationList.json');
  }

  getCertifications(): Observable<Certification[]> {
    return this.http.get<Certification[]>('assets/json/about/certifications.json');
  }
}
