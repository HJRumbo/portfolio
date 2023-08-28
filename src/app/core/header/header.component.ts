import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  menuItems = [
    { title: 'Sobre mí', homePath: '/', fragment: 'about', pagePath: '/about' },
    { title: 'Experiencia', homePath: '/', fragment: 'experience', pagePath: '/experience' },
    { title: 'Proyectos', homePath: '/', fragment: 'projects', pagePath: '/projects' },
    { title: 'Contacto', homePath: '/', fragment: 'contact', pagePath: '/contact' }
  ];

  isOverlayOpen = false;
  isNavbarFixed = false;

  overlay() {
    this.isOverlayOpen = !this.isOverlayOpen;
  }

  @HostListener('window:scroll', ['$event']) onScroll() {
    if (window.scrollY > 80) {
      this.isNavbarFixed = true;
    } else {
      this.isNavbarFixed = false;
    }
  }

}
