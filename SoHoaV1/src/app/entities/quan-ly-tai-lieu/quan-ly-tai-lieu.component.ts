import { Component, OnInit } from '@angular/core';
import { VanBan } from '../../model/van-ban.model';
import { vanbans } from '../../model/van-ban.model';
import { QuanLyTaiLieuPopupService } from './quan-ly-tai-lieu-popup.service';
import { TaiLieuDialogComponent } from './tai-lieu-dialog/tai-lieu-dialog.component';
import { TaiLieuDeleteComponent } from './tai-lieu-delete/tai-lieu-delete.component';

@Component({
  selector: 'app-quan-ly-tai-lieu',
  templateUrl: './quan-ly-tai-lieu.component.html',
  styleUrls: ['./quan-ly-tai-lieu.component.css']
})
export class QuanLyTaiLieuComponent implements OnInit {
  vanbans: VanBan[];
  constructor(
    private taiLieuPopupService: QuanLyTaiLieuPopupService,
  ) { }

  ngOnInit() {
    this.vanbans = vanbans;
  }
  openDialog(id?: number) {

    if (id) {
      this.taiLieuPopupService
        .open(TaiLieuDialogComponent as Component, id);
      console.log(id);

    } else {
      this.taiLieuPopupService
        .open(TaiLieuDialogComponent as Component);
    }

  }
  openDeleteDialog(id?: number) {

      this.taiLieuPopupService
        .open(TaiLieuDeleteComponent as Component, id);
      console.log(id);


  }

}
