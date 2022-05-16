import { Component, OnDestroy } from '@angular/core';
import { filter, interval, map, Observable, retry, Subscription, take } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy {
  public intervalSubs: Subscription;

  constructor() { 
    this.intervalSubs = this.returnInterval().subscribe( console.log );
  }

  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

  returnInterval(): Observable<number> {
    return interval( 1000 )
    .pipe(
      // Para transformar el valor que estamos emitiendo
      map( value => value + 1 ),
      // Para filtrar los valores
      filter( value => (value % 2 === 0) ? true : false ),
    );
  }

  returnObs(): Observable<number> {
    let i = 0;

    return new Observable<number>( observer => {
      const interval = setInterval( () => {
        i++;
        observer.next( i );

        if ( i === 4 ) {
          clearInterval( interval );
          observer.complete();
        }

        if ( i === 2 ) {
          observer.error( 'I llegó al valor de 2' )
        }
      }, 1000 );
    });
  }
}
