import { Injectable } from '@angular/core';
// Environment
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() { }

  async updateImg( file: any, type: 'users' | 'doctors' | 'hospitals', id: string ) {
    try {
      const url = `${ base_url }/uploads/${ type }/${ id }`;
      const formData = new FormData();
      formData.append( 'file', file );

      const resp = await fetch( url, {
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem( 'token' ) || ''
        },
        body: formData

      });

      const data = await resp.json();

      if ( data.ok ) {
        return data.model.img;

      } else {
        return false;

      }

    } catch ( err ) {
      console.log( err );
      return false;
    }
  }
}
