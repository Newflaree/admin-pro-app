import { Component, OnInit } from '@angular/core';
// Models
import { Doctor } from 'src/app/models/doctor.model';

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

  constructor() { }

  ngOnInit(): void {
  }

  search( term: string ) {
  }
  openModal( doctor: any ) {
  }
  saveChanges( doctor: any ) {
  }
  deleteDoctor( doctor: any ) {
  }
  changePage( value: number ) {
  }



}
