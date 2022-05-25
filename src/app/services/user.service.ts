import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LoginForm, RegisterForm } from '../interfaces';
// Interfaces

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor( private http: HttpClient ) { }

  createUser( formData: RegisterForm ) {
    return this.http.post( `${ base_url }/auth/register`, formData );
  }

  login( formData: LoginForm ) {
    return this.http.post( `${ base_url }/auth/login`, formData );
  }
}
