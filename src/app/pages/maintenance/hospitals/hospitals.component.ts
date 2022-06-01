import { Component, OnInit } from '@angular/core';
// Services
import { HospitalService } from 'src/app/services/hospital.service';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styles: [
  ]
})
export class HospitalsComponent implements OnInit {

  constructor(
    private hospitalService: HospitalService
  ) { }

  ngOnInit(): void {
    this.hospitalService.loadHospitals()
    .subscribe( resp => {
      console.log( resp )
    })
  }
}
