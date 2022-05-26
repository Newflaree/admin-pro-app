import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
// Services
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.css'
  ]
})
export class LoginComponent implements OnInit {
  public fromSubmitted = false;

  public loginForm = this.fb.group({
    email: [ localStorage.getItem( 'email' ) || '', [ Validators.required, Validators.email ] ],
    password: [ '', Validators.required ],
    remember: [ false ]
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  login() {
    this.userService.login( this.loginForm.value )
      .subscribe( resp => {
        if ( this.loginForm.get( 'remember' )?.value ) {
          localStorage.setItem( 'email', this.loginForm.get( 'email' )?.value );
        } else {
          localStorage.removeItem( 'email' );
        }

        this.router.navigateByUrl( '/' );

      }, (err) => {
        const error = err.error.msg || err.error.errors[0].msg;
        Swal.fire( 'Error', error, 'error' );
      })

    //this.router.navigateByUrl( '/' );
  }
}
