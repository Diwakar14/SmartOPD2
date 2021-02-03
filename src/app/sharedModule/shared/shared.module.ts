import { LoaderComponent } from './../../pages/dashboard/components/loader/loader.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { SwitchComponent } from './../../pages/dashboard/components/switch/switch.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [SwitchComponent, LoaderComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgxPaginationModule
  ],
  exports: [SwitchComponent, FormsModule, NgxPaginationModule, LoaderComponent]
})
export class SharedModule { }
