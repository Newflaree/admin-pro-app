import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgChartsModule } from 'ng2-charts';

// Components
import { IncrementerComponent } from './incrementer/incrementer.component';
import { DoughnutComponent } from './doughnut/doughnut.component';
import { NodalImgComponent } from './nodal-img/nodal-img.component';

@NgModule({
  declarations: [
    IncrementerComponent,
    DoughnutComponent,
    NodalImgComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgChartsModule
  ],
  exports: [
    IncrementerComponent,
    DoughnutComponent,
    NodalImgComponent
  ]
})
export class ComponentsModule { }
