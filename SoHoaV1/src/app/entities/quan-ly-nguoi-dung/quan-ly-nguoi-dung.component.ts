import { Component, OnInit } from '@angular/core';
import { QuanLyCoQuanPopupService } from '../quan-ly-co-quan/quan-ly-co-quan-popup.service';
import { NguoiDungDialogComponent } from './nguoi-dung-dialog/nguoi-dung-dialog.component';
import { QuanLyNguoiDungPopupService } from './quan-ly-nguoi-dung-popup.service';

@Component({
  selector: 'app-quan-ly-nguoi-dung',
  templateUrl: './quan-ly-nguoi-dung.component.html',
  styleUrls: ['./quan-ly-nguoi-dung.component.css']
})
export class QuanLyNguoiDungComponent implements OnInit {
  page = 1;
  constructor(private quanLyNguoiDungService: QuanLyNguoiDungPopupService) { }

  ngOnInit() {

  }

  openDialog(id?: number) {
    if (id) {
      console.log(id);
      this.quanLyNguoiDungService
        .open(NguoiDungDialogComponent as Component, id);

    } else {
      this.quanLyNguoiDungService
        .open(NguoiDungDialogComponent as Component);
    }

  }
  openDeleteDialog(id?: number) {

      this.quanLyNguoiDungService
        .open(NguoiDungDialogComponent as Component, id);
      console.log(id);
  }

  loadPages(page : number) {

  }
}
