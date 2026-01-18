import { Component, OnInit, OnDestroy } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { I18nService } from '../../../core/services/i18n.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  sectionData: any = {};
  private destroy$ = new Subject<void>();

  constructor(
    private homeService: HomeService,
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
    this.homeService.getHomeData()
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
