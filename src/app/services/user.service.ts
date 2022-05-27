import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
// rxjs
import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
// Enviroments
import { environment } from 'src/environments/environment';
// Interfaces
import { LoadUser, LoginForm, RegisterForm } from '../interfaces';
// Models
import { User } from '../models/user.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public user: User;

  constructor( 
    private http: HttpClient,
    private router: Router
  ) { 
    this.user = {  
      name: '',
      email: '',
      getImg: ''
    }
  }

  get token(): string {
    return localStorage.getItem( 'token' ) || '';
  }

  get uid(): string {
    return this.user.uid || '';
  }
  
  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  tokenValidator(): Observable<boolean> {
    return this.http.get(`${ base_url }/auth/renew`, this.headers ).pipe(
      map( (resp:any) => {
        const { token } = resp;
        const {
          email,
          name,
          role,
          uid,
          img
        } = resp.user;

        this.user = new User(name, email, '', role, img, uid);
        console.log(this.user);

        localStorage.setItem( 'token', token );
        return true;
      }),
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

  updateUser( data: { email: string, name: string } ) {
    return this.http.put( `${ base_url }/users/${ this.uid }`, data, this.headers );
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

  loadUsers( from: number = 0 ) {
    return this.http.get<LoadUser>( `${ base_url }/users/?from=${ from }`, this.headers )
    .pipe(
      map( (resp:any) => {
        const users = resp.users.map( (user: User) => new User( 
          user.name, 
          user.email, 
          '', 
          user.role, 
          user.img, 
          user.uid 
        ))

        return {
          total: resp.total,
          users
        };
      })
    );
  }


}
