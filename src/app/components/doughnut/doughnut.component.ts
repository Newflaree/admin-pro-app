import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ChartData } from 'chart.js';

@Component({
  selector: 'app-doughnut',
  templateUrl: './doughnut.component.html',
  styles: [
  ]
})
export class DoughnutComponent {
  @Input() title: string = 'Sin título';
  @Input( 'labels' ) doughnutChartLabels: string[] = [ 'Label1', 'Label2', 'Label3' ];
  @Input( 'data' ) doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: [ 350, 450, 100 ] },
    ]
  };

  @Output() outputData: EventEmitter<any> = new EventEmitter();

  public chartColors: any[] = [
    { backgroundColor: [ '#9E120E', '#FF5800', '#FFB414' ] }
  ];
}
