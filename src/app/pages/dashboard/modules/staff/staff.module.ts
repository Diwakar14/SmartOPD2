import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaffRoutingModule } from './staff-routing.module';
import { StaffComponent } from './staff.component';
import { StaffDialogComponent } from './components/staff-dialog/staff-dialog.component';


@NgModule({
  declarations: [StaffComponent, StaffDialogComponent],
  imports: [
    CommonModule,
    StaffRoutingModule,
    FormsModule,
    NgxPaginationModule
  ]
})
export class StaffModule { }
