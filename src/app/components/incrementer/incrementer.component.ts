import { Component } from '@angular/core';

@Component({
  selector: 'app-incrementer',
  templateUrl: './incrementer.component.html',
  styles: [
  ]
})
export class IncrementerComponent {
  public progress: number = 40;

  get getPercentage() {
    return `${ this.progress }%`;
  }

  changeValue( value: number ) {
    if ( this.progress >= 100 && value >= 0 ) {
      return this.progress = 100;
    }

    if ( this.progress <= 0 && value < 0 ) {
      return this.progress = 0;
    }

    return this.progress = this.progress + value;
  }

}
