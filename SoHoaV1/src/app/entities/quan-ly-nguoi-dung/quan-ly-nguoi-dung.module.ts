import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuanLyNguoiDungComponent } from './quan-ly-nguoi-dung.component';
import { QuanLyNguoiDungRoutingModule } from './quan-ly-nguoi-dung-routing.module';
import { NguoiDungDialogComponent } from './nguoi-dung-dialog/nguoi-dung-dialog.component';
import { NguoiDungDetailComponent } from './nguoi-dung-detail/nguoi-dung-detail.component';
import { NguoiDungDeleteComponent } from './nguoi-dung-delete/nguoi-dung-delete.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [
    QuanLyNguoiDungComponent,
    NguoiDungDialogComponent,
    NguoiDungDetailComponent,
    NguoiDungDeleteComponent,

  ],
  imports: [
    CommonModule,
    QuanLyNguoiDungRoutingModule,
    NgbModule
  ]
})
export class QuanLyNguoiDungModule { }
