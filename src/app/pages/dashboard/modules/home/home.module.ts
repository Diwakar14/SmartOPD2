import { ChartComponent } from './../../components/chart/chart.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { NgApexchartsModule } from 'ng-apexcharts';


@NgModule({
  declarations: [
    HomeComponent,
    ChartComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NgApexchartsModule,

  ]
})
export class HomeModule { }
