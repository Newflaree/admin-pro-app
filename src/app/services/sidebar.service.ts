import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  public menu: any[] = [
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
    }
  ]

  constructor() { }
}
