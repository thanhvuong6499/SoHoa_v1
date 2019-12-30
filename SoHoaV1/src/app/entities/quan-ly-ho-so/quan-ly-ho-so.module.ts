import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuanLyHoSoRoutingModule } from './quan-ly-ho-so-routing.module';
import { QuanLyHoSoComponent } from './quan-ly-ho-so.component';
import { HoSoDialogComponent } from './ho-so-dialog/ho-so-dialog.component';
import { HoSoDetailComponent } from './ho-so-detail/ho-so-detail.component';
import { HoSoDeleteComponent } from './ho-so-delete/ho-so-delete.component';


@NgModule({
  declarations: [
    QuanLyHoSoComponent,
    HoSoDialogComponent,
    HoSoDetailComponent,
    HoSoDeleteComponent,
  ],
  imports: [
    CommonModule,
    QuanLyHoSoRoutingModule
  ]
})
export class QuanLyHoSoModule { }
