import { Component, OnInit } from '@angular/core';
import { DanhMuc } from '../../model/danh-muc.model';
import { danhmucs } from '../../model/danh-muc.model';
import { QuanLyDanhMucPopupService } from './quan-ly-danh-muc-popup.service';
import { DanhMucDialogComponent } from './danh-muc-dialog/danh-muc-dialog.component';
import { DanhMucDeleteComponent } from './danh-muc-delete/danh-muc-delete.component';

@Component({
  selector: 'app-quan-ly-danh-muc',
  templateUrl: './quan-ly-danh-muc.component.html',
  styleUrls: ['./quan-ly-danh-muc.component.css']
})
export class QuanLyDanhMucComponent implements OnInit {
  danhmucs: DanhMuc[];
  page = 1;
  constructor(
    private danhMucPopupService: QuanLyDanhMucPopupService
  ) { }

  ngOnInit() {
    this.danhmucs = danhmucs;
  }

  openDialog(id?: number) {

    if (id) {
      this.danhMucPopupService
        .open(DanhMucDialogComponent as Component, id);
      console.log(id);

    } else {
      this.danhMucPopupService
        .open(DanhMucDialogComponent as Component);
    }

  }
  openDeleteDialog(id?: number) {

    this.danhMucPopupService
      .open(DanhMucDeleteComponent as Component, id);
    console.log(id);
  }
  loadPages(page : number) {
    // switch (page) {
    //   case 1:
    //     this.coquans = coquans;
    //     break;
    //   case 2:
    //     this.coquans = coquans2;
    //     break;
    //   case 3:
    //     this.coquans = coquans;
    //     break;
    //   default:
    //     break;
    // }
  }
}
