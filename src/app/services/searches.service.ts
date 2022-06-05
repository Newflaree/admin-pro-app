import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import {Hospital} from '../models/hospital.model';
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

  private transformUser( results: any[] = [] ): User[] {
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

  private transformHospital( results: any[] = [] ): Hospital[] {
    return results.map(
      (hospital: Hospital) => new Hospital( 
        hospital.name, 
        hospital._id,
        hospital.img, 
      )
    )
  }

  search( collection: 'users' | 'doctors' | 'hospitals', term: string = '' ) {
    const url = `${ base_url }/searches/${ collection }/${ term }`;

    return this.http.get<User[] | Hospital[]>( url, this.headers )
    .pipe(
      map( (resp: any) => {
        switch( collection ) {
          case 'users':
            return this.transformUser( resp.results );

          case 'hospitals':
            return this.transformHospital( resp.results );

          case 'doctors':
            return this.transformUser( resp.results );

          default:
            return [];
        }
      })
    )
  }
}
