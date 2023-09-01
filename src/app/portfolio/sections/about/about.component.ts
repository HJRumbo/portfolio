import { Component, OnInit } from '@angular/core';
import { About, Skill } from '../../models/about';
import { AboutService } from '../../services/about.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  about!: About;

  constructor(private aboutService: AboutService) 
  {
    this.about = new About;
  }

  ngOnInit(): void {
    this.aboutService.getAboutMeInfo()
      .subscribe(about => {
        this.about = about;
        console.log(about);
        
      });
  }
  
}
