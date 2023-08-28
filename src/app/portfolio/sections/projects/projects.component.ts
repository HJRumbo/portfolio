import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../../services/projects.service';
import { Project } from '../../models/project';

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
export class ProjectsComponent implements OnInit {
  projects!: Project[];

  constructor(private projectsService: ProjectsService) {}

  ngOnInit(): void {
    this.projectsService.getProjects()
      .subscribe(projects => {
        this.projects = projects;
      });
    
  }
}
