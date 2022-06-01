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
  public hospitals: Hospital[] = [];
  public total: number = 0;
  public loading: boolean = true;

  constructor(
    private hospitalService: HospitalService
  ) { }

  ngOnInit(): void {
    this.loadHospitals();
  }

  loadHospitals() {
    this.loading = true;

    this.hospitalService.loadHospitals()
    .subscribe( (data) => {
      this.loading = false;
      this.total = data.total || 0;
      this.hospitals = data.hospitals || [];
    })
  }
}
