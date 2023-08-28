import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  socialMedias = [
    {
      icon: 'fa-regular fa-envelope',
      link: 'mailto: hernandojosern@gmail.com"',
      newTab: false
    },
    {
      icon: 'fa-brands fa-github',
      link: 'https://github.com/HJRumbo',
      newTab: true
    },
    {
      icon: 'fa-brands fa-linkedin',
      link: 'https://www.linkedin.com/in/hernando-jose-rumbo-nu%C3%B1ez-a97984236/',
      newTab: true
    }
  ]
}
