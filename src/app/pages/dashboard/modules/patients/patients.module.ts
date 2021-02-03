import { SharedModule } from './../../../../sharedModule/shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientsRoutingModule } from './patients-routing.module';
import { PatientsComponent } from './patients.component';
import { PatientDialogComponent } from './components/patient-dialog/patient-dialog.component';


@NgModule({
  declarations: [PatientsComponent, PatientDialogComponent],
  imports: [
    CommonModule,
    PatientsRoutingModule,
    NgxPaginationModule,
    SharedModule
  ]
})
export class PatientsModule { }
