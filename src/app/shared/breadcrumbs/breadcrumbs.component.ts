import { Component } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent {
  public title: string = '';

  constructor(
    private router: Router
  ) { 
    this.getDataArgs();
  }

  getDataArgs() {
    this.router.events
    .pipe(
      filter( event => event instanceof ActivationEnd ),
      filter( (event: any) => event.snapshot.firstChild === null ),
      map( (event: any) => event.snapshot.data ),
    )
    .subscribe( ({ title }) => {
      this.title = title;
      document.title = `AdminPro - ${ title }`;
    });
  }
}
