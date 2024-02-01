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
      ariaLabel: 'Enlace a mi email',
      newTab: false
    },
    {
      icon: 'fa-brands fa-github',
      link: 'https://github.com/HJRumbo',
      ariaLabel: 'Enlace a mi cuenta de github',
      newTab: true
    },
    {
      icon: 'fa-brands fa-linkedin',
      link: 'https://www.linkedin.com/in/hernando-jose-rumbo-nu%C3%B1ez-a97984236/',
      ariaLabel: 'Enlace a mi perfil de LinkedIn',
      newTab: true
    },
    {
      icon: 'fa-brands fa-whatsapp',
      link: 'https://wa.me/573045644169?text=Hola,%20Hernando!',
      ariaLabel: 'Chat de Whatsapp',
      newTab: true
    }
  ]
}
