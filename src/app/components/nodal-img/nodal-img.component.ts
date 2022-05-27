import { Component, OnInit } from '@angular/core';
// Models
import { User } from 'src/app/models/user.model';
// Services
import { ModalImgService } from 'src/app/services/modal-img.service';
import {UserService} from 'src/app/services/user.service';

@Component({
  selector: 'app-nodal-img',
  templateUrl: './nodal-img.component.html',
  styles: [
  ]
})
export class NodalImgComponent implements OnInit {
  public uploadedImg: any;
  public imgTemp: any = null;

  constructor( 
    public modalImgService: ModalImgService
  ) { 
  }

  ngOnInit(): void {
  }

  closeModal() {
    this.imgTemp = null;
    this.modalImgService.closeModal();
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
}
