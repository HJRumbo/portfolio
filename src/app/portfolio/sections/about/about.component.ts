import { Component, OnInit } from '@angular/core';
import { Certification, Education } from '../../models/about';
import { AboutService } from '../../services/about.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  skills!: string[];
  educationList!: Education[];
  certifications!: Certification[]; 

  constructor(private aboutService: AboutService) { }

  ngOnInit(): void {
    this.getSkills();
    this.getEducationList();
    this.getCertifications();
  }

  getSkills() {
    this.aboutService.getSkills().subscribe(skills => this.skills = skills );
  }

  getEducationList() {
    this.aboutService.getEducationList().subscribe(educationList => this.educationList = educationList );
  }

  getCertifications() {
    this.aboutService.getCertifications().subscribe(certifications => this.certifications = certifications );
  }
  
}


