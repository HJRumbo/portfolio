import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ExperienceService } from '../../services/experience.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
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
export class ExperienceComponent implements OnInit {
  projects!: Project[];

  constructor(private experienceService: ExperienceService) {}

  ngOnInit(): void {
    this.experienceService.getExperiences()
      .subscribe(projects => {
        this.projects = projects;
      });
    
  }
}
