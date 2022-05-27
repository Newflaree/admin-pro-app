import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
// Models
import { User } from '../models/user.model';

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

  private transformUser( results: any[] ): User[] {
    return results.map(
      (user: User) => new User( 
          user.name, 
          user.email, 
          '', 
          user.role, 
          user.img, 
          user.uid 
        )
    )
  }

  search( collection: 'users' | 'doctors' | 'hospitals', term: string = '' ) {
    const url = `${ base_url }/searches/${ collection }/${ term }`;

    return this.http.get<any[]>( url, this.headers )
    .pipe(
      map( (resp: any) => {
        switch( collection ) {
          case 'users':
            return this.transformUser( resp.users );

          case 'hospitals':
            return this.transformUser( resp.users );

          case 'doctors':
            return this.transformUser( resp.users );

          default:
            return [];
        }
      })
    )
  }
}
