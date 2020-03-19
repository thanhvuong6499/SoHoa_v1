import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuanLyPhongComponent } from './quan-ly-phong.component';
import { ModalModule } from "ngx-bootstrap";
import { PhongDialogComponent } from './phong-dialog/phong-dialog.component';
import { QuanLyPhongPopupService } from './quan-ly-phong-popup.service';
import { RouterModule } from '@angular/router';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { phongPopupRoute, quanLyPhongRoutes, QuanLyPhongRoutingModule } from './quan-ly-phong-routing.module';
import { BaseModule } from '../../views/base/base.module';
import { FormsComponent } from '../../views/base/forms.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PhongDeleteComponent } from './phong-delete/phong-delete.component';
import { PhongDetailComponent } from './phong-detail/phong-detail.component';
import { Select2Module } from 'ng-select2-component';
import { HttpClientModule } from '@angular/common/http';
import { NgSelect2Module } from 'ng-select2';
import { MatFormFieldModule, MatInputModule, MatAutocompleteModule } from '@angular/material';
// import { QuanLyPhongRoutingModule } from './quan-ly-phong-routing.module';
const ENTITY_STATES = [
  ...quanLyPhongRoutes,
  ...phongPopupRoute,
];
@NgModule({
  declarations: [
    QuanLyPhongComponent,
    PhongDialogComponent,
    PhongDeleteComponent,
    PhongDetailComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    MatFormFieldModule,
    Select2Module,
    MatInputModule,
    MatAutocompleteModule,
    HttpClientModule,
    QuanLyPhongRoutingModule,
    NgSelect2Module
    
  ],
  entryComponents: [
    QuanLyPhongComponent,
    PhongDialogComponent,
    PhongDeleteComponent
  ],
  providers: [
    QuanLyPhongPopupService,
  ]
})
export class QuanLyPhongModule { }