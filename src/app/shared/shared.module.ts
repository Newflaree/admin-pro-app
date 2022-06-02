import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
// Modules
import { PipesModule } from '../pipes/pipes.module';
// Components
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from './header/header.component';



@NgModule({
  declarations: [
    SidebarComponent,
    BreadcrumbsComponent,
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    PipesModule,
    RouterModule
  ], 
  exports: [
    SidebarComponent,
    BreadcrumbsComponent,
    HeaderComponent,
  ]
})
export class SharedModule { }
