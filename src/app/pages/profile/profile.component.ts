import { Component, OnInit } from '@angular/core'; import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {User} from 'src/app/models/user.model';
// Services
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit {
  public profileForm: FormGroup = this.fb.group({});
  public user: User;

  constructor( 
    private fb: FormBuilder,
    private userService: UserService
  ) { 
    this.user = userService.user;
  }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      name: [ this.user.name, Validators.required ],
      email: [ this.user.email, [Validators.required, Validators.email] ]
    });
  }

  updateProfile() {
    console.log( this.profileForm.value );
    this.userService.updateUser( this.profileForm.value )
      .subscribe( (resp:any) => {
        const { name, email } = resp.user;
        this.user.name = name;
        this.user.email = email;
      })
  }
}
