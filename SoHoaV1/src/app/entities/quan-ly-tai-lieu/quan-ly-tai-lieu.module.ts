import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuanLyTaiLieuRoutingModule } from './quan-ly-tai-lieu-routing.module';
import { QuanLyTaiLieuComponent } from './quan-ly-tai-lieu.component';


@NgModule({
  declarations: [
    QuanLyTaiLieuComponent,
  ],
  imports: [
    CommonModule,
    QuanLyTaiLieuRoutingModule
  ]
})
export class QuanLyTaiLieuModule { }
