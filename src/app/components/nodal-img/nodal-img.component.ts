import { Component, OnInit } from '@angular/core';
// Services
import { ModalImgService } from 'src/app/services/modal-img.service';

@Component({
  selector: 'app-nodal-img',
  templateUrl: './nodal-img.component.html',
  styles: [
  ]
})
export class NodalImgComponent implements OnInit {
  constructor( public modalImgService: ModalImgService ) { }

  ngOnInit(): void {
  }

  closeModal() {
    this.modalImgService.closeModal();
  }
}
