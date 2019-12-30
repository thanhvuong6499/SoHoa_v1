import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuanLyCoQuanRoutingModule } from './quan-ly-co-quan-routing.module';
import { QuanLyCoQuanComponent } from './quan-ly-co-quan.component';
import { CoQuanDialogComponent } from './co-quan-dialog/co-quan-dialog.component';
import { CoQuanDetailComponent } from './co-quan-detail/co-quan-detail.component';
import { CoQuanDeleteComponent } from './co-quan-delete/co-quan-delete.component';


@NgModule({
  declarations: [
    QuanLyCoQuanComponent,
    CoQuanDialogComponent,
    CoQuanDetailComponent,
    CoQuanDeleteComponent,
  ],
  imports: [
    CommonModule,
    QuanLyCoQuanRoutingModule
  ]
})
export class QuanLyCoQuanModule { }
