import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { TypewriteDirective } from './typewrite.directive';



@NgModule({
  declarations: [
    HeaderComponent,
    TypewriteDirective
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    TypewriteDirective
  ]
})
export class CoreModule { }
