import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nodal-img',
  templateUrl: './nodal-img.component.html',
  styles: [
  ]
})
export class NodalImgComponent implements OnInit {
  public hideModal: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  closeModal() {
    this.hideModal = false;
  }
}
