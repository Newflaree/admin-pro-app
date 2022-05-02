import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Routing
import { PagesRoutingModule } from './pages/pages-routing.module';
// Components
import { LoginComponent } from './auth/login/login.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { RegisterComponent } from './auth/register/register.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: '**', component: NopagefoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot( routes ),
    PagesRoutingModule
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
