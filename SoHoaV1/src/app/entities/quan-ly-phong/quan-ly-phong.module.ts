import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuanLyPhongComponent } from './quan-ly-phong.component';
import { ModalModule } from "ngx-bootstrap";
import { ThemMoiPhongComponent } from './them-moi-phong/them-moi-phong.component';
import { PhongDialogComponent, PhongPopupComponent } from './phong-dialog/phong-dialog.component';
import { QuanLyPhongPopupService } from './quan-ly-phong-popup.service';
import { RouterModule } from '@angular/router';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { phongPopupRoute, quanLyPhongRoutes } from './quan-ly-phong-routing.module';
// import { QuanLyPhongRoutingModule } from './quan-ly-phong-routing.module';
const ENTITY_STATES = [
  ...quanLyPhongRoutes,
  ...phongPopupRoute,
];
@NgModule({
  declarations: [
    QuanLyPhongComponent,
    ThemMoiPhongComponent,
    PhongDialogComponent,
    PhongPopupComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    ModalModule.forRoot(),
    RouterModule.forChild(ENTITY_STATES),
  ],
  entryComponents: [
    PhongDialogComponent,
    PhongPopupComponent
  ],
  providers: [

    QuanLyPhongPopupService,
    NgbActiveModal
  ]
})
export class QuanLyPhongModule { }