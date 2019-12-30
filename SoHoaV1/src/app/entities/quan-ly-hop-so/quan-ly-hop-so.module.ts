import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuanLyHopSoRoutingModule } from './quan-ly-hop-so-routing.module';
import { QuanLyHopSoComponent } from './quan-ly-hop-so.component';
import { DetailHopSoComponent } from './detail-hop-so/detail-hop-so.component';
import { HopSoDeleteComponent } from './hop-so-delete/hop-so-delete.component';
import { HopSoDialogComponent } from './hop-so-dialog/hop-so-dialog.component';


@NgModule({
  declarations: [
    QuanLyHopSoComponent,
    DetailHopSoComponent,
    HopSoDeleteComponent,
    HopSoDialogComponent,

  ],
  imports: [
    CommonModule,
    QuanLyHopSoRoutingModule
  ]
})
export class QuanLyHopSoModule { }
