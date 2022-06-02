import { Component, OnInit } from '@angular/core';
import {Hospital} from 'src/app/models/hospital.model';
// Services
import { HospitalService } from 'src/app/services/hospital.service';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styles: [
  ]
})
export class HospitalsComponent implements OnInit {
  public totalHospitals: number = 0;
  public hospitals: Hospital[] = [];
  public from: number = 0;
  public loading: boolean = true;
  public type: string = 'hospitals';

  constructor(
    private hospitalService: HospitalService
  ) { }

  ngOnInit(): void {
    this.loadHospitals();
  }

  loadHospitals() {
    this.loading = true;

    this.hospitalService.loadHospitals( this.from )
    .subscribe( (data) => {
      this.loading = false;
      this.totalHospitals = data.total || 0;
      this.hospitals = data.hospitals || [];
    })
  }

  changePage( value: number ) {
    this.from += value;

    if ( this.from < 0 ) {
      this.from = 0;

    } else if ( this.from > this.totalHospitals ) {
      this.from -= value;
    }

    this.loadHospitals();
  }
}
