import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

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
  });

  constructor( private fb: FormBuilder ) { }

  createUser() {
    this.fromSubmitted = true;
    console.log( this.registerForm.value );
    if ( this.registerForm.valid ) {
      console.log( 'Posting form' );

    } else {
      console.log( 'Invalid form' );
    }
  }

  invalidField( field: string ): boolean {
    if ( this.registerForm.get( field )?.invalid && this.fromSubmitted ) {
      return true;

    } else {
      return false;

    }
  }

  acceptTemrs() {
    return !this.registerForm.get( 'terms' )?.value && this.fromSubmitted;
  }
}
