import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Doctor, Hospital, User } from 'src/app/models';
// Services
import { SearchesService } from 'src/app/services';

@Component({
  selector: 'app-searches',
  templateUrl: './searches.component.html',
  styles: [
  ]
})
export class SearchesComponent implements OnInit {
  public users: User[] = [];
  public hospitals: Hospital[] = [];
  public doctors: Doctor[] = [];

  constructor( 
    private activatedRoute: ActivatedRoute,
    private searchesService: SearchesService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
    .subscribe( ({ term }) => this.globalSearch( term ) );
  }

  globalSearch( term: string ) {
    this.searchesService.globalSearch( term )
    .subscribe( (results: any) => {
      this.users = results.users;
      this.hospitals = results.hospitals;
      this.doctors = results.doctors;
    });
  }
}
