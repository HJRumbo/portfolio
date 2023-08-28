import { Component, OnInit } from '@angular/core';
import { Skill } from '../../models/skill';
import { SkillService } from '../../services/skill.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  skills!: Skill[];

  constructor(private skillService: SkillService) {}

  ngOnInit(): void {
    this.skillService.getSkills()
      .subscribe(skills => {
        this.skills = skills;
      });
  }
  
}
