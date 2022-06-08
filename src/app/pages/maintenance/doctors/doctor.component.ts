import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Hospital} from 'src/app/models';
import {HospitalService} from 'src/app/services';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styles: [
  ]
})
export class DoctorComponent implements OnInit {
  public doctorForm: FormGroup;
  public hospitals: Hospital[] = [];

  constructor(
    private fb: FormBuilder,
    private hospitalService: HospitalService
  ) { 
    this.doctorForm = this.fb.group({
      name: [ 'GG', Validators.required ],
      hospital: [ '', Validators.required ]
    })
  }

  ngOnInit(): void {
    this.loadHospitals();
  }

  loadHospitals() {
    this.hospitalService.loadHospitals()
    .subscribe( ({ hospitals }) => this.hospitals = hospitals || [] )
  }

  saveDoctor() {
    console.log( this.doctorForm.value );
  }
}
