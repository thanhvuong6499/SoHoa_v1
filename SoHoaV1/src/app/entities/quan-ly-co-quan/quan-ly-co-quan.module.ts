import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuanLyCoQuanRoutingModule } from './quan-ly-co-quan-routing.module';
import { QuanLyCoQuanComponent } from './quan-ly-co-quan.component';


@NgModule({
  declarations: [
    QuanLyCoQuanComponent,
  ],
  imports: [
    CommonModule,
    QuanLyCoQuanRoutingModule
  ]
})
export class QuanLyCoQuanModule { }
