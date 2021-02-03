import { DashboardComponent } from './dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
        data: { title: 'Home' }
      },
      {
        path: 'appointments',
        loadChildren: () => import('./modules/appointments/appointments.module').then(m => m.AppointmentsModule),
        data: { title: 'Appointments' }
      },
      {
        path: 'patients',
        loadChildren: () => import('./modules/patients/patients.module').then(m => m.PatientsModule),
        data: { title: 'Patients' }
      },
      {
        path: 'doctor',
        loadChildren: () => import('./modules/doctor/doctor.module').then(m => m.DoctorModule),
        data: { title: 'Doctors' }
      },
      {
        path: 'departments',
        loadChildren: () => import('./modules/department/department.module').then(m => m.DepartmentModule),
        data: { title: 'Departments' }
      },
      {
        path: 'staffs',
        loadChildren: () => import('./modules/staff/staff.module').then(m => m.StaffModule),
        data: { title: 'Staffs' }
      },
      {
        path: 'report',
        loadChildren: () => import('./modules/reports/reports.module').then(m => m.ReportsModule),
        data: { title: 'Reports' }
      },
      {
        path: 'laboratory',
        loadChildren: () => import('./modules/laboratory/laboratory.module').then(m => m.LaboratoryModule),
        data: { title: 'Laboratory' }
      },
      {
        path: '',
        loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
        data: { title: 'Home' }
      },

    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
