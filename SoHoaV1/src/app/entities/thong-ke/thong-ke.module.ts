import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThongKeComponent } from './thong-ke/thong-ke.component';
import { NhatKyComponent } from './nhat-ky/nhat-ky.component';
import { ThongKeRoutingModule } from './thong-ke-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { ThongKeHopSoComponent } from './thong-ke-hop-so/thong-ke-hop-so.component';
import { ThongKeHoSoComponent } from './thong-ke-ho-so/thong-ke-ho-so.component';



@NgModule({
  declarations: [ThongKeComponent, NhatKyComponent,ThongKeHopSoComponent,ThongKeHoSoComponent],
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
