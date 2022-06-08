import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
// Interfaces
import { LoadDoctors } from '../interfaces/load-doctors.interface';
// Models
import { Doctor } from '../models/doctor.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  public doctor: Doctor;

  constructor(
    private http: HttpClient
  ) { 
    this.doctor = {
      name: '',
      img: '',
    }
  }

  get token(): string {
    return localStorage.getItem( 'token' ) || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  loadDoctors( from: number = 0 ) {
    const url = `${ base_url }/doctors?from=${ from }`
    return this.http.get<LoadDoctors>( url, this.headers )
    .pipe(
      map( (resp: {total: number, doctors: Doctor[] }) => {
        return {
          total: resp.total,
          doctors: resp.doctors
        }
      })
    );
  }
  
  loadDoctor() {

  }

  createDoctor( name: string, hospital: string ) {
    return this.http.post(
      `${ base_url }/doctors`,
      { name, hospital },
      this.headers
    );
  }

  deleteDoctor( _id: string ) {
    const url = `${ base_url }/doctors/${ _id }`
    return this.http.delete( url, this.headers );
  }
}
