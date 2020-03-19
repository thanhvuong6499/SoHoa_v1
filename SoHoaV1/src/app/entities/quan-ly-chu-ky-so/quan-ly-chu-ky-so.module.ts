import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuanLyChuKySoRoutingModule } from './quan-ly-chu-ky-so-routing.module';
import { QuanLyChuKySoComponent } from './quan-ly-chu-ky-so/quan-ly-chu-ky-so.component';


@NgModule({
  declarations: [QuanLyChuKySoComponent],
  imports: [
    CommonModule,
    QuanLyChuKySoRoutingModule
  ]
})
export class QuanLyChuKySoModule { }
