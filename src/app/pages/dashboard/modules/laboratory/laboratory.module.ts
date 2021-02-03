import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LaboratoryRoutingModule } from './laboratory-routing.module';
import { LaboratoryComponent } from './laboratory.component';


@NgModule({
  declarations: [LaboratoryComponent],
  imports: [
    CommonModule,
    LaboratoryRoutingModule
  ]
})
export class LaboratoryModule { }
