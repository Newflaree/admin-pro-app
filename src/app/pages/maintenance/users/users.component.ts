import { Component, OnInit } from '@angular/core';
// Models
import { User } from 'src/app/models/user.model';
// Services
import { UserService } from 'src/app/services/user.service';
import { SearchesService } from 'src/app/services/searches.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [
  ]
})
export class UsersComponent implements OnInit {
  public totalUsers: number = 0;
  public users: User[] = [];
  public usersTemp: User[] = [];
  public from: number = 0;
  public loading: boolean = true;

  constructor(
    private userService: UserService,
    private searchesService: SearchesService
  ) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.loading = true;
    this.userService.loadUsers( this.from )
    .subscribe( ({ total, users }) => {
      this.totalUsers = total;
      this.users = users;
      this.usersTemp = users;
      this.loading = false;
    });
  }

  changePage( value: number ) {
    this.from += value;

    if ( this.from < 0 ) {
      this.from = 0;

    } else if ( this.from > this.totalUsers ) {
      this.from -= value;
    }

    this.loadUsers();
  }

  search( term: string ) {
    if ( term.length === 0 ) {
      return this.users = this.usersTemp;
    }

    return this.searchesService.search( 'users', term )
    .subscribe( resp => {
      this.users = resp;
    })
  }
}
