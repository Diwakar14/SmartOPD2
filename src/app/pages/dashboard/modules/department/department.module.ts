import { SharedModule } from './../../../../sharedModule/shared/shared.module';
import { DeptCardComponent } from './../../components/dept-card/dept-card.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartmentRoutingModule } from './department-routing.module';
import { DepartmentComponent } from './department.component';


@NgModule({
  declarations: [
    DepartmentComponent,
    DeptCardComponent,
  ],
  imports: [
    CommonModule,
    DepartmentRoutingModule,
    SharedModule
  ]
})
export class DepartmentModule { }
