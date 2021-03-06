import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ModalImgService {
  private _hideModal: boolean = true;
  public type: 'users' | 'doctors' | 'hospitals' = 'users' || 'doctors' || 'hospitals';
  public id: string = '';
  public img: string = '';

  public newImg: EventEmitter<string> = new EventEmitter<string>();

  get hideModal() {
    return this._hideModal;
  }

  openModal(  
    type: 'users' | 'doctors' | 'hospitals',
    id: string = '',
    img?: string
  ) {
    this._hideModal = false;

    this.type = type;
    this.id = id;
    this.img = img || '';

    if ( !img || img.length === 0 ) {
      return this.img = `${ base_url }/uploads/${ type }/${ id }`;
    }

    return this.img = img;
  }

  closeModal() {
    this._hideModal = true;
  }

  constructor() { }
}
