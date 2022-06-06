import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
// Models
import { Doctor } from 'src/app/models/doctor.model';
// Services
import { DoctorService } from 'src/app/services/doctor.service';
import { ModalImgService } from 'src/app/services';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styles: [
  ]
})
export class DoctorsComponent implements OnInit {
  public totalDoctors: number = 0;
  public doctors: Doctor[] = [];
  public doctorsTemp: Doctor[] = [];
  public from: number = 0;
  public loading: boolean = false;
  public type: string = 'doctors';

  constructor(
    private doctorService: DoctorService,
    private modalImgService: ModalImgService
  ) {}

  ngOnInit(): void {
    this.loadDoctors();
  }

  loadDoctors() {
    this.loading = true;
    this.doctorService.loadDoctors().subscribe(
      ({ total, doctors }) => {
        this.totalDoctors = total;
        this.doctors = doctors;
        this.loading = false;
      }
    )
  }

  async deleteDoctor( doctor: Doctor ) {
    const { _id = '' } = doctor;

    return await Swal.fire({
      title: 'Are you sure to delete this doctor?',
      text: `You  are about to delete ${ doctor.name }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete this',
      confirmButtonColor: '#3085D6',
      cancelButtonColor: '#D33',
    }).then( (results) => {
      this.doctorService.deleteDoctor( _id )
      .subscribe( resp => {
        this.loadDoctors();
        Swal.fire(
          'Doctor Deleted',
          `Dr. ${ doctor.name } was successfully deleted`,
          'success'
        )
      })
    });
  }

  search( term: string ) {
  }

  openModal( doctor: Doctor ) {
    this.modalImgService.openModal( 'doctors', doctor._id || '', doctor.img || '' );
  }

  saveChanges( doctor: any ) {
  }

  changePage( value: number ) {
  }

}
