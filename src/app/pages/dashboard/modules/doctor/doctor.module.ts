import { SharedModule } from './../../../../sharedModule/shared/shared.module';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorRoutingModule } from './doctor-routing.module';
import { DoctorComponent } from './doctor.component';
import { DocCardComponent } from './component/doc-card/doc-card.component';
import { DocProfileComponent } from './pages/doc-profile/doc-profile.component';
import { AppntsComponent } from '../../components/appnts/appnts.component';
import { DocProfileBasicComponent } from './component/doc-profile-basic/doc-profile-basic.component';
import { DocChartComponent } from './component/doc-chart/doc-chart.component';
import { DocHolidayComponent } from './component/doc-holiday/doc-holiday.component';
import { DocReviewComponent } from './component/doc-review/doc-review.component';
import { DocPatientsComponent } from './component/doc-patients/doc-patients.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';


@NgModule({
  declarations: [
    DoctorComponent,
    DocCardComponent,
    DocProfileComponent,
    AppntsComponent,
    DocProfileBasicComponent,
    DocChartComponent,
    DocHolidayComponent,
    DocReviewComponent,
    DocPatientsComponent,

  ],
  imports: [
    CommonModule,
    DoctorRoutingModule,
    NgApexchartsModule,
    MatSelectModule,
    MatFormFieldModule,
    SharedModule
  ]
})
export class DoctorModule { }
