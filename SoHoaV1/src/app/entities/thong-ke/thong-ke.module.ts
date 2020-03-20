import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThongKeComponent } from './thong-ke/thong-ke.component';
import { NhatKyComponent } from './nhat-ky/nhat-ky.component';
import { ThongKeRoutingModule } from './thong-ke-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [ThongKeComponent, NhatKyComponent],
  imports: [
    CommonModule,
    ThongKeRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
  ]
})
export class ThongKeModule { }
