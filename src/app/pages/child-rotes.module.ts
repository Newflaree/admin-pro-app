import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Components
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { ProfileComponent } from './profile/profile.component';
import { ProgressComponent } from './progress/progress.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { SearchesComponent } from './searches/searches.component';
// Guards
import { AdminGuard } from '../guards';
// Maintenance
import { DoctorsComponent } from './maintenance/doctors/doctors.component';
import { DoctorComponent } from './maintenance/doctors/doctor.component';
import { HospitalsComponent } from './maintenance/hospitals/hospitals.component';
import { UsersComponent } from './maintenance/users/users.component';

const childRoutes: Routes = [
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
  { 
        path: 'search/:term',
        component: SearchesComponent,
        data: { 
          title: 'Search' 
        } 
  },

  // Maintenance
  { 
        path: 'hospitals',
        component: HospitalsComponent,
        data: { 
          title: 'Hospitals Maintenance'
        } 
  },
  { 
        path: 'doctors',
        component: DoctorsComponent,
        data: { 
          title: 'Doctors Maintenance'
        } 
  },
  { 
        path: 'doctor/:id',
        component: DoctorComponent,
        data: { 
          title: 'Doctor Maintenance'
        } 
      },
  // Admin Routes
  { 
        path: 'users',
        canActivate: [ AdminGuard ],
        component: UsersComponent,
        data: { 
          title: 'Users Maintenance'
        } 
  }
]


@NgModule({
  imports: [
    RouterModule.forChild(childRoutes)
  ],
  exports: [ RouterModule ]
})
export class ChildRotesModule { }
