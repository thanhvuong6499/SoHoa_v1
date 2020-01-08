import { Component, OnInit } from '@angular/core';
import { DanhMuc, danhmucs } from '../../../model/danh-muc.model';
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
    if (this.danhmuc.id && this.danhmuc.id != undefined) {
      for(let i = 0; i < danhmucs.length; i++) {
        if (danhmucs[i].id == this.danhmuc.id) {
          danhmucs[i] = this.danhmuc;
          break;
        }
      }
    }
    else {
      let id = danhmucs.length;
      this.danhmuc.id = id + 1;
      danhmucs.push(this.danhmuc);
    }
    this.clear();
    
  }

}
