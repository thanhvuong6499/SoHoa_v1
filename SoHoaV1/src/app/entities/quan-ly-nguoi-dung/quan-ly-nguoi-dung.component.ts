import { Component, OnInit } from '@angular/core';
import { QuanLyCoQuanPopupService } from '../quan-ly-co-quan/quan-ly-co-quan-popup.service';
import { NguoiDungDialogComponent } from './nguoi-dung-dialog/nguoi-dung-dialog.component';
import { QuanLyNguoiDungPopupService } from './quan-ly-nguoi-dung-popup.service';
import { UserService } from './user.service';
import { BaseCondition } from '../../common';
import { User } from '../../model/user.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-quan-ly-nguoi-dung',
  templateUrl: './quan-ly-nguoi-dung.component.html',
  styleUrls: ['./quan-ly-nguoi-dung.component.css']
})
export class QuanLyNguoiDungComponent implements OnInit {
  page = 1;
  condition: BaseCondition<User> = new BaseCondition<User>();
  pageSize: number;
  totalRecords: number;
  users: User[];

  constructor(private quanLyNguoiDungService: QuanLyNguoiDungPopupService,
              private userService : UserService,
              private toastService: ToastrService
  ) { 
    
  }

  ngOnInit() {
    this.condition.PageIndex = 1;
    this.condition.PageSize = 5;
    this.userService.userGetSearchWithPaging(this.condition)
      .subscribe((result) => {
        this.pageSize = result.itemList.length;
        this.totalRecords = result.totalRows;
        this.users = result.itemList;
      }, (error) => {
        console.log(error);
      });
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
    this.condition.PageIndex = page;
    this.userService.userGetSearchWithPaging(this.condition)
      .subscribe((result) => {
        // this.pageSize = result.itemList.length;
        // this.totalRecords = result.totalRows;
        this.users = result.itemList;
      }, (error) => {
        console.log(error);
      });
  }
}
