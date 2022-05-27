import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
// Models
import { User } from 'src/app/models/user.model';
// Services
import { ModalImgService } from 'src/app/services/modal-img.service';
import { SearchesService } from 'src/app/services/searches.service';
import { UserService } from 'src/app/services/user.service';

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
    private searchesService: SearchesService,
    private modalImgService: ModalImgService

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

  async deleteUser( user: User ) {
    if ( user.uid === this.userService.uid ) {
      return Swal.fire( 'Error', "Can't erase itself", 'error' );
    }

    return await Swal.fire({
      title: 'Are you sure to delete this user?',
      text: `You are about to delete user ${ user.name }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085D6',
      cancelButtonColor: '#D33',
      confirmButtonText: 'Yes, delete it'

    }).then( (result) => {
      if ( result.value ) {
        this.userService.deleteUser( user )
        .subscribe( resp => {
          this.loadUsers();
          Swal.fire(
            'User deleted',
            `${ user.name } was successfully deleted`,
            'success'
          );
        })
      }
    })
  }

  changeRole( user: User ) {
    this.userService.saveUser(user)
    .subscribe( resp => {
      Swal.fire( 
        'Success',
        `User ${ user.name } now has ${ user.role }`,
        'success' 
      )
    })
  }

  openModal( user: User ) {
    this.modalImgService.openModal();
  }
}
