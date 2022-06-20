import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Guards
import { AdminGuard, AuthGuard } from '../guards';
// Components
import { PagesComponent } from './pages.component';

const routes: Routes = [
  { 
    path: 'dashboard', 
    component: PagesComponent,
    canActivate: [ AuthGuard ],
    canLoad: [ AuthGuard ],
    loadChildren: () => import('./child-rotes.module').then( m => m.ChildRotesModule )
  },
];

@NgModule({
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule ]
})
export class PagesRoutingModule { }
