import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TraCuuComponent } from './tra-cuu/tra-cuu.component';
import { TraCuuRoutingModule } from './tra-cuu-routing.module';



@NgModule({
  declarations: [TraCuuComponent],
  imports: [
    TraCuuRoutingModule,
    CommonModule
  ]
})
export class TraCuuModule { }
