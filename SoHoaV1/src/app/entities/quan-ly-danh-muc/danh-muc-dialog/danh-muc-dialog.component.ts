import { Component, OnInit } from '@angular/core';
import { DanhMuc } from '../../../model/danh-muc.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { QuanLyDanhMucPopupService } from '../quan-ly-danh-muc-popup.service';

@Component({
  selector: 'app-danh-muc-dialog',
  templateUrl: './danh-muc-dialog.component.html',
  styleUrls: ['./danh-muc-dialog.component.css']
})
export class DanhMucDialogComponent implements OnInit {
  danhmuc: DanhMuc;
  constructor(
    private activeModal: NgbActiveModal,
    private danhMucPopupService: QuanLyDanhMucPopupService,
  ) { }

  ngOnInit() {
    this.danhmuc = this.danhMucPopupService.getDanhMucById();
  }
  clear() {
    this.activeModal.dismiss('cancel');
  
  }
  save(){
    console.log(this.danhmuc);
    
  }

}
