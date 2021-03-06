import { PatientProfileComponent } from './pages/patient-profile/patient-profile.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PatientsComponent } from './patients.component';

const routes: Routes = [
  {
    path: ':id', component: PatientProfileComponent
  },
  {
    path: '', component: PatientsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientsRoutingModule { }
