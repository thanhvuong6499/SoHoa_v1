import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuanLyDanhMucComponent } from './quan-ly-danh-muc.component';
import { QuanLyDanhMucRoutingModule } from './quan-ly-danh-muc-routing.module';
import { DanhMucDialogComponent } from './danh-muc-dialog/danh-muc-dialog.component';
import { DanhMucDetailComponent } from './danh-muc-detail/danh-muc-detail.component';
import { DanhMucDeleteComponent } from './danh-muc-delete/danh-muc-delete.component';
import { QuanLyDanhMucPopupService } from './quan-ly-danh-muc-popup.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    QuanLyDanhMucComponent,
    DanhMucDialogComponent,
    DanhMucDetailComponent,
    DanhMucDeleteComponent
  ],
  imports: [
    CommonModule,
    QuanLyDanhMucRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents:[
    DanhMucDialogComponent,
    DanhMucDeleteComponent
  ],
  providers:[
    QuanLyDanhMucPopupService
  ]
})
export class QuanLyDanhMucModule { }
