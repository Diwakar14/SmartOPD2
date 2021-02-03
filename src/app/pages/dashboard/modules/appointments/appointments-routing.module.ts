import { BookAppointmentComponent } from './components/book-appointment/book-appointment.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppointmentsComponent } from './appointments.component';

const routes: Routes = [
  { path: 'book', component: BookAppointmentComponent },
  { path: '', component: AppointmentsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentsRoutingModule { }
