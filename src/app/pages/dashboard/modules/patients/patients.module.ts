import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from './../../../../sharedModule/shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientsRoutingModule } from './patients-routing.module';
import { PatientsComponent } from './patients.component';
import { PatientDialogComponent } from './components/patient-dialog/patient-dialog.component';
import { PatientProfileComponent } from './pages/patient-profile/patient-profile.component';


@NgModule({
  declarations: [PatientsComponent, PatientDialogComponent, PatientProfileComponent],
  imports: [
    CommonModule,
    PatientsRoutingModule,
    NgxPaginationModule,
    MatDialogModule,
    SharedModule
  ]
})
export class PatientsModule { }
