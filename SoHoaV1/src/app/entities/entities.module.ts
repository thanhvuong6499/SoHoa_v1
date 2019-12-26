import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuanLyNguoiDungModule } from './quan-ly-nguoi-dung/quan-ly-nguoi-dung.module';
import { QuanLyDanhMucModule } from './quan-ly-danh-muc/quan-ly-danh-muc.module';
import { QuanLyHopSoModule } from './quan-ly-hop-so/quan-ly-hop-so.module';
import { QuanLyPhongModule } from '../entities/quan-ly-phong/quan-ly-phong.module';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    QuanLyNguoiDungModule,
    QuanLyDanhMucModule,
    QuanLyHopSoModule,
    QuanLyPhongModule,
  ],
})
export class EntitiesModule { }
