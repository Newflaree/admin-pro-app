import { Component } from '@angular/core';
import { Router } from '@angular/router';
// Models
import { User } from 'src/app/models/user.model';
// Services
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {
  public user: User;

  constructor(
    private userService: UserService,
    private router: Router
  ) { 
    this.user = userService.user;
  }

  search( term: string ) {
    if ( term.length === 0 ) {
      return;
    }

    this.router.navigateByUrl( `/dashboard/search/${ term }` );
  }

  logout() {
    this.userService.logout();
  }
}
