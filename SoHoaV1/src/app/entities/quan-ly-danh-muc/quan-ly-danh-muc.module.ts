import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuanLyDanhMucComponent } from './quan-ly-danh-muc.component';
import { QuanLyDanhMucRoutingModule } from './quan-ly-danh-muc-routing.module';



@NgModule({
  declarations: [
    QuanLyDanhMucComponent
  ],
  imports: [
    CommonModule,
    QuanLyDanhMucRoutingModule
  ]
})
export class QuanLyDanhMucModule { }
