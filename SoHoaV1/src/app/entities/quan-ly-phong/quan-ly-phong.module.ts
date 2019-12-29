import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuanLyPhongComponent } from './quan-ly-phong.component';
import { ModalModule } from "ngx-bootstrap";
import { PhongDialogComponent, PhongPopupComponent } from './phong-dialog/phong-dialog.component';
import { QuanLyPhongPopupService } from './quan-ly-phong-popup.service';
import { RouterModule } from '@angular/router';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { phongPopupRoute, quanLyPhongRoutes } from './quan-ly-phong-routing.module';
import { BaseModule } from '../../views/base/base.module';
import { FormsComponent } from '../../views/base/forms.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PhongDeleteComponent } from './phong-delete/phong-delete.component';
import { PhongDetailComponent } from './phong-detail/phong-detail.component';
// import { QuanLyPhongRoutingModule } from './quan-ly-phong-routing.module';
const ENTITY_STATES = [
  ...quanLyPhongRoutes,
  ...phongPopupRoute,
];
@NgModule({
  declarations: [
    QuanLyPhongComponent,
    PhongDialogComponent,
    PhongPopupComponent,
    PhongDeleteComponent,
    PhongDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    ModalModule.forRoot(),
    RouterModule.forChild(ENTITY_STATES),
    
  ],
  entryComponents: [
    QuanLyPhongComponent,
    PhongDialogComponent,
    PhongPopupComponent
  ],
  providers: [
    
    QuanLyPhongPopupService,
    NgbActiveModal
  ]
})
export class QuanLyPhongModule { }