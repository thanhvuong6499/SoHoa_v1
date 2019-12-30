import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuanLyTaiLieuRoutingModule } from './quan-ly-tai-lieu-routing.module';
import { QuanLyTaiLieuComponent } from './quan-ly-tai-lieu.component';
import { TaiLieuDialogComponent } from './tai-lieu-dialog/tai-lieu-dialog.component';
import { TaiLieuDetailComponent } from './tai-lieu-detail/tai-lieu-detail.component';
import { TaiLieuDeleteComponent } from './tai-lieu-delete/tai-lieu-delete.component';


@NgModule({
  declarations: [
    QuanLyTaiLieuComponent,
    TaiLieuDialogComponent,
    TaiLieuDetailComponent,
    TaiLieuDeleteComponent,
  ],
  imports: [
    CommonModule,
    QuanLyTaiLieuRoutingModule
  ]
})
export class QuanLyTaiLieuModule { }
