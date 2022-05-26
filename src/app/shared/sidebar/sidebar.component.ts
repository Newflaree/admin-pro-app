import { Component } from '@angular/core';
// Services
import { SidebarService } from 'src/app/services/sidebar.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {
  menuItems: any[];
  public imgUrl: string = '';


  constructor(
    private sidebarService: SidebarService,
    private userService: UserService
  ) { 
    this.menuItems = sidebarService.menu;
    this.imgUrl = userService.user.getImg;
  }

  logout() {
    this.userService.logout();
  }
}
