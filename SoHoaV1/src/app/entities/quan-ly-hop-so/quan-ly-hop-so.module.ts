import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuanLyHopSoRoutingModule } from './quan-ly-hop-so-routing.module';
import { QuanLyHopSoComponent } from './quan-ly-hop-so.component';
import { DetailHopSoComponent } from './detail-hop-so/detail-hop-so.component';
import { HopSoDeleteComponent } from './hop-so-delete/hop-so-delete.component';
import { HopSoDialogComponent } from './hop-so-dialog/hop-so-dialog.component';
import { QuanLyHopSoPopupService } from './quan-ly-hop-so-popup.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    QuanLyHopSoComponent,
    DetailHopSoComponent,
    HopSoDeleteComponent,
    HopSoDialogComponent,

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    QuanLyHopSoRoutingModule
  ],
  entryComponents:[
    HopSoDialogComponent,
  ],
  providers:[
    QuanLyHopSoPopupService
  ]
})
export class QuanLyHopSoModule { }
