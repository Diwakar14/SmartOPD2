import { DocProfileComponent } from './pages/doc-profile/doc-profile.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DoctorComponent } from './doctor.component';

const routes: Routes = [
  { path: ':id', component: DocProfileComponent },
  { path: '', component: DoctorComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorRoutingModule { }
