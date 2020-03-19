import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThongKeComponent } from './thong-ke/thong-ke.component';
import { NhatKyComponent } from './nhat-ky/nhat-ky.component';
import { ThongKeRoutingModule } from './thong-ke-routing.module';



@NgModule({
  declarations: [ThongKeComponent, NhatKyComponent],
  imports: [
    CommonModule,
    ThongKeRoutingModule
  ]
})
export class ThongKeModule { }
