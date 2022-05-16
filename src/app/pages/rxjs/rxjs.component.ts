import { Component } from '@angular/core';
import { interval, map, Observable, retry, take } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent {
  constructor() { 
    this.returnInterval().subscribe( console.log );
  }

  returnInterval(): Observable<number> {
    return interval( 1000 )
    .pipe(
      // Para indicar cuántas veces vamos a ejecutar el intervalo
      take( 4 ),
      // Para transformar el valor que estamos emitiendo
      map( value => {
        return value + 1
      })
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
