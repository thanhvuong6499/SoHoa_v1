import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuanLyNguoiDungModule } from './quan-ly-nguoi-dung/quan-ly-nguoi-dung.module';
import { QuanLyDanhMucModule } from './quan-ly-danh-muc/quan-ly-danh-muc.module';
import { QuanLyHopSoModule } from './quan-ly-hop-so/quan-ly-hop-so.module';
import { QuanLyPhongModule } from '../entities/quan-ly-phong/quan-ly-phong.module';
import { QuanLyCoQuanComponent } from './quan-ly-co-quan/quan-ly-co-quan.component';
import { QuanLyHoSoModule } from './quan-ly-ho-so/quan-ly-ho-so.module';
import { QuanLyCoQuanModule } from './quan-ly-co-quan/quan-ly-co-quan.module';
import { QuanLyTaiLieuModule } from './quan-ly-tai-lieu/quan-ly-tai-lieu.module';
import { QuanLyHoSoComponent } from './quan-ly-ho-so/quan-ly-ho-so.component';
import { QuanLyTaiLieuComponent } from './quan-ly-tai-lieu/quan-ly-tai-lieu.component';
import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    QuanLyNguoiDungModule,
    QuanLyDanhMucModule,
    QuanLyHopSoModule,
    QuanLyPhongModule,
    QuanLyHoSoModule,
    QuanLyCoQuanModule,
    QuanLyTaiLieuModule,
    MaterialModule
  ],
})
export class EntitiesModule { }
