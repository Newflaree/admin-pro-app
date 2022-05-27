import { Component, OnInit } from '@angular/core'; import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
// Models
import { User } from 'src/app/models/user.model';
// Services
import { UserService } from 'src/app/services/user.service';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit {
  public profileForm: FormGroup = this.fb.group({});
  public user: User;
  public uploadedImg: any;
  public imgTemp: any = null;

  constructor( 
    private fb: FormBuilder,
    private userService: UserService,
    private fileUploadService: FileUploadService 
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

        Swal.fire( 'Saved', 'Changes saved successfully', 'success' );
      }, (err) => {
        //TODO: implementar error desde el backend
        console.log( err );
      });
  }

  changeImg( event: any ) {
    const file = event.target.files[0];
    this.uploadedImg = file;

    if ( !file ) {
      return this.imgTemp = null;
    }

    const reader = new FileReader();
    const url64 = reader.readAsDataURL( file );

    return reader.onloadend = () => {
      this.imgTemp = reader.result;
    }
  }

  uploadFile() {
    this.fileUploadService.updateImg( this.uploadedImg, 'users', this.userService.uid )
    .then( img => {
      this.user.img = img
      Swal.fire( 'Saved', 'Image updated successfully', 'success' );
    })
    .catch( err => {
      //TODO: implementar error desde el backend
      console.log( err );
    });
  }
}
