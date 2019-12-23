import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuanLyPhongComponent } from './quan-ly-phong.component';
import { QuanLyPhongRoutingModule } from './quan-ly-phong-routing.module';
import { ModalModule } from "ngx-bootstrap";
import { ThemMoiPhongComponent } from './them-moi-phong/them-moi-phong.component';

@NgModule({
  declarations: [
    QuanLyPhongComponent,
    ThemMoiPhongComponent
  ],
  imports: [
    CommonModule,
    ModalModule.forRoot(),
    QuanLyPhongRoutingModule
  ]
})
export class QuanLyPhongModule { }