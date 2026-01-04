import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [
    `
      .main {
        margin-top: 80px;
        background-color: var(--color-bg-primary);
        color: var(--color-text);
        transition: background-color var(--transition-base), color var(--transition-base);
        min-height: calc(100vh - 80px);
      }
    `
  ]
})
export class AppComponent {
  title = 'portfolio';
}
