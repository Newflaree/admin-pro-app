import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
// Enviroments
import { environment } from 'src/environments/environment';
import {Hospital} from '../models/hospital.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(
    private http: HttpClient
  ) { }

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

  loadHospitals( from: number = 0 ) {
    return this.http.get( `${ base_url }/hospitals/?from=${ from }`, this.headers )
    .pipe(
      map( (resp: { ok?: boolean, total?: number, hospitals?: Hospital[] }) => {
        return {
          ok: resp.ok,
          total: resp.total,
          hospitals: resp.hospitals,
        }
      })
    )
  }
}
