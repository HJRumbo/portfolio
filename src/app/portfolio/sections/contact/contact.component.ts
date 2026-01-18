import { Component, OnInit, OnDestroy } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { I18nService } from '../../../core/services/i18n.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit, OnDestroy {
  sectionData: any = {};
  private destroy$ = new Subject<void>();

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
      link: 'https://www.linkedin.com/in/hernando-rumbo/',
      ariaLabel: 'Enlace a mi perfil de LinkedIn',
      newTab: true
    },
    {
      icon: 'fa-brands fa-whatsapp',
      link: 'https://wa.me/573045644169?text=Hola,%20Hernando! Vengo desde tu portafolio web.',
      ariaLabel: 'Chat de Whatsapp',
      newTab: true
    }
  ]

  constructor(
    private contactService: ContactService,
    private i18nService: I18nService
  ) {}

  ngOnInit(): void {
    this.loadSectionData();

    // Reload when language changes
    this.i18nService.currentLanguage$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.loadSectionData());
  }

  private loadSectionData() {
    this.contactService.getContactData()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.sectionData = data;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
