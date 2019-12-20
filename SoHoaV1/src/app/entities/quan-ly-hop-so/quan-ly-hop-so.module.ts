import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuanLyHopSoRoutingModule } from './quan-ly-hop-so-routing.module';
import { QuanLyHopSoComponent } from './quan-ly-hop-so.component';
import { DetailHopSoComponent } from './detail-hop-so/detail-hop-so.component';


@NgModule({
  declarations: [
    QuanLyHopSoComponent,
    DetailHopSoComponent,

  ],
  imports: [
    CommonModule,
    QuanLyHopSoRoutingModule
  ]
})
export class QuanLyHopSoModule { }
