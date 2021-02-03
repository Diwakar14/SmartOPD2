import { SharedModule } from './../../../../sharedModule/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppointmentsRoutingModule } from './appointments-routing.module';
import { AppointmentsComponent } from './appointments.component';
import { AppntDetailsDialogComponent } from '../../components/appnt-details-dialog/appnt-details-dialog.component';
import { ReceiptComponent } from '../../components/receipt/receipt.component';
import { BookAppointmentComponent } from './components/book-appointment/book-appointment.component';
import { SearchDocComponent } from './components/search-doc/search-doc.component';
import { SearchPatComponent } from './components/search-pat/search-pat.component';
import { SearchResultItemsComponent } from './components/search-result-items/search-result-items.component';


@NgModule({
  declarations: [
    AppointmentsComponent,
    AppntDetailsDialogComponent,
    ReceiptComponent,
    BookAppointmentComponent,
    SearchDocComponent,
    SearchPatComponent,
    SearchResultItemsComponent,
  ],
  imports: [
    CommonModule,
    AppointmentsRoutingModule,
    SharedModule
  ]
})
export class AppointmentsModule { }
