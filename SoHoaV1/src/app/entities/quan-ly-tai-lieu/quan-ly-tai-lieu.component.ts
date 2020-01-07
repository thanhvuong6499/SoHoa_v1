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
  public vanbans: VanBan[];
  public userRole: string;
  public roles : string;
  constructor(
    private taiLieuPopupService: QuanLyTaiLieuPopupService,
  ) { }

  ngOnInit() {
    this.vanbans = vanbans;
    this.userRole = localStorage.getItem('role');
    if (this.userRole === 'user') {
      this.roles = localStorage.getItem('roles');
      console.log(this.roles);
    }
    else {
      this.roles = 'admin';
    }
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
