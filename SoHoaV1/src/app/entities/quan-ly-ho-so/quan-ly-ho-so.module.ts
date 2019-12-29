import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuanLyHoSoRoutingModule } from './quan-ly-ho-so-routing.module';
import { QuanLyHoSoComponent } from './quan-ly-ho-so.component';


@NgModule({
  declarations: [
    QuanLyHoSoComponent,
  ],
  imports: [
    CommonModule,
    QuanLyHoSoRoutingModule
  ]
})
export class QuanLyHoSoModule { }
