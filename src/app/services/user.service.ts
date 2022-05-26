import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
// rxjs
import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
// Enviroments
import { environment } from 'src/environments/environment';
// Interfaces
import { LoginForm, RegisterForm } from '../interfaces';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor( 
    private http: HttpClient,
    private router: Router
  ) { }

  tokenValidator(): Observable<boolean> {
    const token = localStorage.getItem( 'token' ) || '';

    return this.http.get(`${ base_url }/auth/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      tap( (resp:any) => {
        const { token } = resp;
        localStorage.setItem( 'token', token );
      }),
      map( resp => true ),
      catchError( error => of(false) )
    );
  }

  createUser( formData: RegisterForm ) {
    return this.http.post( `${ base_url }/auth/register`, formData )
      .pipe(
        tap( (resp:any) => {
          const { token } = resp;
          localStorage.setItem( 'token', token );
        })
      );
  }

  login( formData: LoginForm ) {
    return this.http.post( `${ base_url }/auth/login`, formData )
      .pipe(
        tap( (resp:any) => {
          const { token } = resp;
          localStorage.setItem( 'token', token );
        })
      );
  }

  logout() {
    localStorage.removeItem( 'token' );
    this.router.navigateByUrl( '/login' );
  }
}
