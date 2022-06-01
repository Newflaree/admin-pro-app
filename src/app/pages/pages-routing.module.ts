import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Guards
import { AuthGuard } from '../guards/auth.guard';
// Components
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { ProfileComponent } from './profile/profile.component';
import { ProgressComponent } from './progress/progress.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
      // Maintenance
import { DoctorsComponent } from './maintenance/doctors/doctors.component';
import { HospitalsComponent } from './maintenance/hospitals/hospitals.component';
import { UsersComponent } from './maintenance/users/users.component';

const routes: Routes = [
  { 
    path: 'dashboard', 
    component: PagesComponent,
    canActivate: [ AuthGuard ],
    children: [
      { 
        path: '',
        component: DashboardComponent,
        data: { 
          title: 'Dashboard' 
        } 
      },
      { 
        path: 'progress',
        component: ProgressComponent,
        data: { 
          title: 'Progress Bars' 
        } 
      },
      { 
        path: 'grafica1',
        component: Grafica1Component,
        data: { 
          title: 'Graphics' 
        } 
      },
      { 
        path: 'account-settings',
        component: AccountSettingsComponent,
        data: { 
          title: 'Account Settings' 
        } 
      },
      { 
        path: 'promesas',
        component: PromesasComponent,
        data: { 
          title: 'Promises' 
        } 
      },
      { 
        path: 'rxjs',
        component: RxjsComponent,
        data: { 
          title: 'ReactiveX' 
        } 
      },
      { 
        path: 'profile',
        component: ProfileComponent,
        data: { 
          title: 'Profile' 
        } 
      },

      // Maintenance
      { 
        path: 'users',
        component: UsersComponent,
        data: { 
          title: 'User Maintenance'
        } 
      },
      { 
        path: 'hospitals',
        component: HospitalsComponent,
        data: { 
          title: 'Hospital Maintenance'
        } 
      },
      { 
        path: 'doctors',
        component: DoctorsComponent,
        data: { 
          title: 'Doctor Maintenance'
        } 
      }
    ]
  },
];

@NgModule({
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule ]
})
export class PagesRoutingModule { }
