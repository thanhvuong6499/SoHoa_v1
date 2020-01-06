import { Component, OnInit } from '@angular/core';
import { DanhMuc } from '../../../model/danh-muc.model';
import { QuanLyDanhMucPopupService } from '../quan-ly-danh-muc-popup.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-danh-muc-delete',
  templateUrl: './danh-muc-delete.component.html',
  styleUrls: ['./danh-muc-delete.component.css']
})
export class DanhMucDeleteComponent implements OnInit {
  danhmuc: DanhMuc;
  constructor(
    private danhMucPopupService: QuanLyDanhMucPopupService,
    private activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
    this.danhmuc = this.danhMucPopupService.getDanhMucById();
  }

}
