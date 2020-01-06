import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ModalDirective, BsModalRef } from 'ngx-bootstrap';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap'
import { QuanLyPhongPopupService } from './quan-ly-phong-popup.service';
import { ActivatedRoute } from '@angular/router';
import { PhongDialogComponent } from './phong-dialog/phong-dialog.component';
import { Phong } from '../../model/phong.model';
import { phongs } from '../../model/phong.model';
import { PhongDeleteComponent } from './phong-delete/phong-delete.component';
@Component({
  selector: 'app-quan-ly-phong',
  templateUrl: './quan-ly-phong.component.html',
  styleUrls: ['./quan-ly-phong.component.css']
})
export class QuanLyPhongComponent implements OnInit {
  @ViewChild("modalPhong") public modalPhong: ModalDirective;
  phongs: Phong[];
  routeSub: any;
  constructor(
    private route: ActivatedRoute,
    private phongPopupService: QuanLyPhongPopupService
  ) { }

  ngOnInit() {
    this.phongs = phongs;
  }

  openDialog(id?: number) {

    if (id) {
      this.phongPopupService
        .open(PhongDialogComponent as Component, id);

    } else {
      this.phongPopupService
        .open(PhongDialogComponent as Component);
    }

  }
  openDeleteDialog(id?: number) {

    this.phongPopupService
      .open(PhongDeleteComponent as Component, id);


  }
}
