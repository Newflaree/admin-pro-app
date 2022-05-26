import { Component } from '@angular/core';
// Services
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {
  public imgUrl: string = '';

  constructor(
    private userService: UserService
  ) { 
    this.imgUrl = userService.user.getImg;
  }

  logout() {
    this.userService.logout();
  }
}
