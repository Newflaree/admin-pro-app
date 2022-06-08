import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
// Models
import { Doctor, Hospital } from 'src/app/models';
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
    private activatedRoute: ActivatedRoute,
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
    this.activatedRoute.params.subscribe( ({ id }) => {
      this.loadDoctor( id );
    })
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

  loadDoctor( id: string ) {
    if ( id === 'new' ) {
      return;
    }

    return this.doctorService.loadDoctor( id )
    .subscribe( (doctor: any) => {
      const { name, hospital: { _id } } = doctor;

      this.selectedDoctor = doctor;
      return this.doctorForm.setValue({ name, hospital: _id });
    }, err => {
      return this.router.navigateByUrl('/dashboard/doctors');
    });
  }

  saveDoctor() {
    if ( this.selectedDoctor ) {
      this.doctorService.updateDoctor(
        this.selectedDoctor._id,
        this.selectedDoctor.name,
        this.selectedDoctor.hospital
      ).subscribe( resp => console.log(resp))

    } else {
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
}
