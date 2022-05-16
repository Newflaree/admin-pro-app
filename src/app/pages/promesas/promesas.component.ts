import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styleUrls: ['./promesas.component.css']
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const promesa = new Promise( ( resolve, reject ) => {
      if ( false ) {
        resolve( 'Hola Mundo' );
      } else {
        reject( 'Algo salió mal' );
      }
    });
    promesa.then( ( msg ) => {
      console.log( msg );
    }).catch( err => console.log( 'Error en mi pormesa:', err ) );

    console.log( 'Fin del Init' );
  }
}
