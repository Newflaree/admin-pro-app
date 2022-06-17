import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
// Models
import { Doctor, Hospital, User } from '../models';

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

  private transformDoctor( results: any[] = [] ): Doctor[] {
    return results.map(
      (doctor: Doctor) => new Doctor( 
        doctor.name, 
        doctor._id,
        doctor.img, 
      )
    )
  }

  globalSearch( term: string ) {
    const url = `${ base_url }/searches/global/${ term }`;

    return this.http.get( url, this.headers ).pipe(
      map( (resp: any) => resp.results )
    );
  }

  search( collection: 'users' | 'doctors' | 'hospitals', term: string = '' ) {
    const url = `${ base_url }/searches/${ collection }/${ term }`;

    return this.http.get<User[] | Hospital[] | Doctor[]>( url, this.headers )
    .pipe(
      map( (resp: any) => {
        switch( collection ) {
          case 'users':
            return this.transformUser( resp.results );

          case 'hospitals':
            return this.transformHospital( resp.results );

          case 'doctors':
            return this.transformDoctor( resp.results );

          default:
            return [];
        }
      })
    )
  }
}
