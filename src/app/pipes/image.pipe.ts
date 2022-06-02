import { Pipe, PipeTransform } from '@angular/core';
// Environment
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform( 
    img: string = '',
    type?: 'users' | 'hospitals' | 'doctors',
    uid: string = ''
  ): string {
    if ( !img ) {
      return `${ base_url }/uploads/${ type }/${ uid }`;
    }

    return img;
  }
}
