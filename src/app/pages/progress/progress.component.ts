import { Component } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: [ './progress.component.css' ]
})
export class ProgressComponent {
  public progress1: number = 20;
  public progress2: number = 30;

  get getProgress1() {
    return `${ this.progress1 }%`;
  }

  get getProgress2() {
    return `${ this.progress2 }%`;
  }
}
