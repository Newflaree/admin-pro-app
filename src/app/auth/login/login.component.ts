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
    email: [ 'test1@email.com', [ Validators.required, Validators.email ] ],
    password: [ '123456', Validators.required ],
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
        console.log( resp );
      }, (err) => {
        Swal.fire( 'Error', err.error.msg, 'error' );
      })

    //this.router.navigateByUrl( '/' );
  }
}
