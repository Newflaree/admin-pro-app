import { Component, OnInit } from '@angular/core';
import { delay, Subscription } from 'rxjs';
import Swal from 'sweetalert2';
// Models
import { Hospital } from 'src/app/models/hospital.model';
// Services
import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImgService } from 'src/app/services/modal-img.service';

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

  private imgSubs: Subscription;

  constructor(
    private hospitalService: HospitalService,
    private modalImgService: ModalImgService
  ) { 
    this.imgSubs = this.modalImgService.newImg
      .pipe( delay( 100 ) )
      .subscribe( img => this.loadHospitals() );
  }

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

  saveChanges( hospital: Hospital ) {
    const { _id = '', name = '' } = hospital

    this.hospitalService.updateHospital( _id, name )
    .subscribe( resp => {
      this.loadHospitals();
      Swal.fire( 
        'Success',
        'Successfully upgraded hospital',
        'success' 
      );
    }, err => {
      Swal.fire( 
        'Error',
        err.error.errors[0].msg,
        'error' 
      );
    });
  }

  deleteHospital( hospital: Hospital ) {
    const { _id = '' } = hospital;

    this.hospitalService.deleteHospital( _id )
    .subscribe( (resp: any) => {
      this.loadHospitals();
      Swal.fire( 
        'Success',
        resp.msg,
        'success' 
      );
    });
  }

  async openSweetAlertModal() {
    const { value = '' } = await Swal.fire<string>({
      title: 'Create Hospital',
      text: 'Enter hospital name',
      input: 'text',
      inputPlaceholder: 'Hospital name',
      showCancelButton: true
    });

    if ( value.trim().length > 0 ) {
      this.hospitalService.createHospital( value )
      .subscribe( (resp: any) => {
        this.hospitals.push( resp.hospital )
      }, err => {
        Swal.fire( 
          'Error',
          err.error.errors[0].msg,
          'error' 
        );
      });
    }
  }

  openModal( hospital: Hospital ) {
    this.modalImgService.openModal( 'hospitals', hospital._id || '', hospital.img );
  }
}
