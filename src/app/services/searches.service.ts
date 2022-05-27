import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import {User} from '../models/user.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class SearchesService {

  constructor(
    private http: HttpClient
  ) { }

  get token() {
    return localStorage.getItem( 'token' ) || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  search( collection: 'users' | 'doctors' | 'hospitals', term: string = '' ) {
    const url = `${ base_url }/searches/${ collection }/${ term }`;

    return this.http.get<any[]>( url, this.headers )
    .pipe(
      map( (resp: any) => resp.users )
    )
  }
}
