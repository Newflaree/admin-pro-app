import { Component, OnDestroy, OnInit } from '@angular/core';
import { delay, Subscription } from 'rxjs';
import Swal from 'sweetalert2';
// Models
import { Hospital } from 'src/app/models/hospital.model';
// Services
import {
  HospitalService,
  ModalImgService,
  SearchesService
} from 'src/app/services';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styles: [
  ]
})
export class HospitalsComponent implements OnInit, OnDestroy {
  public totalHospitals: number = 0;
  public hospitals: Hospital[] = [];
  public hospitalsTemp: Hospital[] = [];
  public from: number = 0;
  public loading: boolean = true;
  public type: string = 'hospitals';

  private imgSubs: Subscription;

  constructor(
    private hospitalService: HospitalService,
    private modalImgService: ModalImgService,
    private searchesService: SearchesService
  ) { 
    this.imgSubs = this.modalImgService.newImg
      .pipe( delay( 100 ) )
      .subscribe( img => this.loadHospitals() );
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.loadHospitals();
  }

  loadHospitals() {
    this.loading = true;

    this.hospitalService.loadHospitals( this.from )
    .subscribe( ({ total, hospitals }) => {
      this.totalHospitals = total || 0;
      this.hospitals = hospitals || [];
      this.hospitalsTemp = hospitals || [];
      this.loading = false;
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

  async deleteHospital( hospital: Hospital ) {
    const { _id = '' } = hospital;

    return await Swal.fire({
      title: 'Are you sure to delete this hospital?',
      text: `You are about to delete ${ hospital.name } hispital`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085D6',
      cancelButtonColor: '#D33',
      confirmButtonText: 'Yes, delete this'
    }). then( (result) => {
      if ( result.value ) {
        this.hospitalService.deleteHospital( _id )
        .subscribe( resp => {
          this.loadHospitals();
          Swal.fire(
            'Hospital Deleted',
            `Hospital ${ hospital.name } was successfully deleted`,
            'success'
          );
        });
      }
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
        Swal.fire( 'Success', 'Hospital created successfully', 'success' );
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
    this.modalImgService.openModal( 'hospitals', hospital._id || '', hospital.img || '' );
  }

  search( term: string = '' ) {
    if ( term.length === 0 ) {
      return this.hospitals = this.hospitalsTemp ;
    }

    return this.searchesService.search( 'hospitals', term )
    .subscribe( (resp: any) => {
      this.hospitals = resp;
    })
  }
}
