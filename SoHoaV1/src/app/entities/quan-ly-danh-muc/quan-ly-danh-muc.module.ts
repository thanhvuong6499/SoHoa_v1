import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuanLyDanhMucComponent } from './quan-ly-danh-muc.component';
import { QuanLyDanhMucRoutingModule } from './quan-ly-danh-muc-routing.module';
import { DanhMucDialogComponent } from './danh-muc-dialog/danh-muc-dialog.component';
import { DanhMucDetailComponent } from './danh-muc-detail/danh-muc-detail.component';
import { DanhMucDeleteComponent } from './danh-muc-delete/danh-muc-delete.component';



@NgModule({
  declarations: [
    QuanLyDanhMucComponent,
    DanhMucDialogComponent,
    DanhMucDetailComponent,
    DanhMucDeleteComponent
  ],
  imports: [
    CommonModule,
    QuanLyDanhMucRoutingModule
  ]
})
export class QuanLyDanhMucModule { }
