import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuanLyNguoiDungComponent } from './quan-ly-nguoi-dung.component';
import { QuanLyNguoiDungRoutingModule } from './quan-ly-nguoi-dung-routing.module';



@NgModule({
  declarations: [
    QuanLyNguoiDungComponent,

  ],
  imports: [
    CommonModule,
    QuanLyNguoiDungRoutingModule
  ]
})
export class QuanLyNguoiDungModule { }
