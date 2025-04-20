import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  homePath: string = '/';
  homeFragment: string = '';
  activeFragment: string = '';
  menuItems = [
    { title: 'Inicio', fragment: this.homeFragment },
    { title: 'Sobre mí', fragment: 'about' },
    { title: 'Experiencia', fragment: 'experience' },
    { title: 'Proyectos', fragment: 'projects' },
    { title: 'Contacto', fragment: 'contact' }
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

  setActiveFragment(fragment: string) {
    this.activeFragment = fragment;
  }
}
