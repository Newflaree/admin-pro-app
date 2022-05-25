import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// Services
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [
    './register.component.css'
  ]
})
export class RegisterComponent {
  public fromSubmitted = false;

  public registerForm = this.fb.group({
    name: [ '', [ Validators.required, Validators.minLength(3) ] ],
    email: [ '', [ Validators.required, Validators.email ] ],
    password: [ '', Validators.required ],
    password2: [ '', Validators.required ],
    terms: [ false, Validators.required ]
  }, {
    validators: this.samePasswords( 'password', 'password2' )
  });

  constructor( 
    private fb: FormBuilder,
    private userService: UserService
  ) { }

  createUser() {
    this.fromSubmitted = true;
    console.log( this.registerForm.value );

    if ( this.registerForm.invalid ) {
      return;
    } 

    this.userService.createUser( this.registerForm.value )
      .subscribe( resp => {
        console.log( 'User Created' );
        console.log( resp );
      }, ( err ) => console.warn( err.error.errors[0].msg ) );
  }

  invalidField( field: string ): boolean {
    if ( this.registerForm.get( field )?.invalid && this.fromSubmitted ) {
      return true;

    } else {
      return false;

    }
  }

  invalidPasswords(): boolean {
    const pass1 = this.registerForm.get( 'password' )?.value;
    const pass2 = this.registerForm.get( 'password2' )?.value;

    if ( (pass1 !== pass2) && this.fromSubmitted ) {
      return true;

    } else {
      return false;
    }
  }

  acceptTemrs() {
    return !this.registerForm.get( 'terms' )?.value && this.fromSubmitted;
  }

  samePasswords( pass1: string, pass2: string ) {
    return ( formGroup: FormGroup ) => {
      const pass1Control = formGroup.get( pass1 );
      const pass2Control = formGroup.get( pass2 );

      if ( pass1Control?.value === pass2Control?.value ) {
        pass2Control?.setErrors( null );

      } else {
        pass2Control?.setErrors({ isNotSame: true });
      }
    }
  }
}
