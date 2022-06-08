import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
// Models
import { Hospital } from 'src/app/models';
// Services
import { DoctorService, HospitalService } from 'src/app/services';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styles: [
  ]
})
export class DoctorComponent implements OnInit {
  public doctorForm: FormGroup;
  public hospitals: Hospital[] = [];
  public selectedHospital: any;
  public selectedDoctor: any;

  constructor(
    private doctorService: DoctorService,
    private fb: FormBuilder,
    private hospitalService: HospitalService,
    private router: Router
  ) { 
    this.doctorForm = this.fb.group({
      name: [ '', Validators.required ],
      hospital: [ '', Validators.required ]
    })
  }

  ngOnInit(): void {
    this.loadHospitals();
    this.doctorForm.get( 'hospital' )?.valueChanges
    .subscribe( hospitalId => {
      this.selectedHospital = this.hospitals.find( h => h._id === hospitalId )
    })
  }

  loadHospitals() {
    this.hospitalService.loadHospitals()
    .subscribe( ({ hospitals }) => this.hospitals = hospitals || [] )
  }

  saveDoctor() {
    const { name, hospital } = this.doctorForm.value;

    this.doctorService.createDoctor( name, hospital )
    .subscribe( (resp: any) => {
      const { doctor } = resp;
      Swal.fire(
        'Created',
        'Successfully created doctor',
        'success'
      );
      this.router.navigateByUrl(`/dashboard/doctor/${ doctor._id }`)
    }, err => {
      Swal.fire(
        'Error',
        err.error.errors[0].msg
      );
    });
  }
}
