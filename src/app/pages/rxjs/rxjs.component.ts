import { Component } from '@angular/core';
import { Observable, retry } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent {
  constructor() { 

    this.returnObs().pipe(
      retry(1)
    ).subscribe( 
      valor => console.log( 'Subs', valor ) ,
      err => console.warn( 'Error:', err ),
      () => console.info( 'Obs terminado' )
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
