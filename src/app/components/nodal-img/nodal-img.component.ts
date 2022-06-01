import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
// Models
// Services
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImgService } from 'src/app/services/modal-img.service';

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
    public modalImgService: ModalImgService,
    private fileUploadService: FileUploadService
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

  uploadFile() {
    const id = this.modalImgService.id;
    const type = this.modalImgService.type;
    
    this.fileUploadService.updateImg( this.uploadedImg, type, id )
    .then( img => {
      Swal.fire( 'Saved', 'Image updated successfully', 'success' );
      this.modalImgService.newImg.emit( img );

      this.closeModal();
    })
    .catch( err => {
      //TODO: implementar error desde el backend
      console.log( err );
    });
  }
}
