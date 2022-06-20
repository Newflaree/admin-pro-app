import { Injectable } from '@angular/core';
import {Menu} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  public menu: Menu[] = [{
    title: '',
    icon: '',
    submenu: []
  }]

  loadMenu() {
    this.menu = JSON.parse( localStorage.getItem( 'menu' ) || '' );
  }
    /*
    {
      title: 'Dashboard',
      icon: 'mdi mdi-gauge',
      submenu: [
        { title: 'Main', url: '/' },
        { title: 'ProgressBar', url: 'progress' },
        { title: 'Graphic', url: 'grafica1' },
        { title: 'Promesas', url: 'promesas' },
        { title: 'Rxjs', url: 'rxjs' }
      ]
    },
    {
      title: 'Maintenance',
      icon: 'mdi mdi-folder-lock-open',
      submenu: [
        { title: 'Users', url: 'users' },
        { title: 'Hospitals', url: 'hospitals' },
        { title: 'Doctors', url: 'doctors' },
      ]
    }
     * */

}
