import { Component, OnInit } from '@angular/core';
import { QuanLyCoQuanPopupService } from '../quan-ly-co-quan/quan-ly-co-quan-popup.service';
import { NguoiDungDialogComponent } from './nguoi-dung-dialog/nguoi-dung-dialog.component';
import { QuanLyNguoiDungPopupService } from './quan-ly-nguoi-dung-popup.service';
import { UserService } from './user.service';
import { BaseCondition } from '../../common';
import { User } from '../../model/user.model';
import { ToastrService } from 'ngx-toastr';
import { Options } from 'select2';
import { Select2OptionData } from 'ng-select2';
import { UserGroup } from '../../model/user-group.model';

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
  user: User;
  options: Options;
  userGroup: UserGroup[];
  lstFont: Array<Select2OptionData>;
  userGroupArr : Array<Select2OptionData>;
  arrayTypeValue: string[];
  searchText: string = "";


  constructor(private quanLyNguoiDungService: QuanLyNguoiDungPopupService,
              private userService : UserService,
              private toastService: ToastrService
  ) { 
    this.searchText = "";
    this.condition = new BaseCondition<User>();
    this.userGroupArr = new Array<Select2OptionData>();
    this.options = {
      width: "100%",
      closeOnSelect: true,
      multiple: true,
      tags: true
    }
    this.user = new User();
  }

  ngOnInit() {
    this.loadFilterOptionsOrgan();
    this.loadAll();
  }

  openDialog(id?: number) {
    if (id) {
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
  }

  loadAll(){
    this.userService.userGetSearchWithPaging().subscribe((data : any) => {
      this.users = data.itemList;
      this.pageSize = 5;
      this.page = 1;
      this.totalRecords = data.totalRows;
    }, (error) => {
    }, () => {
      console.log('Lấy dữ liệu thành công.');
    });
  }

  loadPages(page : string) {
    try {
      var condi : BaseCondition<User> = new BaseCondition<User>();
      if (this.condition.FilterRuleList != undefined) {
        condi.FilterRuleList = this.condition.FilterRuleList;
      }
      condi.PageIndex = parseInt(page);
      this.userService.userGetSearchWithPaging(condi).subscribe((data : any) => {
        this.users = data.itemList;
        this.pageSize = 5;
        this.page = parseInt(page);
        this.totalRecords = data.totalRows
      }, (error) => {
      }, () => {

      });
    }
    catch (e) {
      alert(JSON.stringify(e))
    }
  }


  getUserById(userID: number) {
    
  }

  loadFilterOptionsOrgan () {
    this.userService.getAllRole()
      .subscribe((result) => {
        var arrTypes = [];
        for (const item of result.itemList) {
          let value = { id: item.roleID, text: item.roleName }
          arrTypes.push(value);
        }
        this.userGroupArr = arrTypes;
      }, 
      (error => {
      }),
      () => {
      })
  }

  onChange(searchText: string){
    this.searchText = searchText;
    this.getFilterOptions(this.arrayTypeValue);
  }

  getFilterOptions (types: string[]) {
    this.condition.PageIndex = 1;
    this.condition.FilterRuleList = [
      {
        field: "ur.RoleID",
        op: "",
        value: ""
      },
      {
        field: "u.UserName",
        op: "",
        value: ""
      }
    ]
    this.arrayTypeValue = types;
    if (this.arrayTypeValue != undefined) {
      this.condition.FilterRuleList[0].value = types.toString();
      if (types.length == 1) {
        this.condition.FilterRuleList[0].op = "and_contains";
      }
      else {
        this.condition.FilterRuleList[0].op = "and_in_strings";
      }
    }

    if (this.searchText != "") {
      var length = this.condition.FilterRuleList.length;
      this.condition.FilterRuleList[1].value = this.searchText;
      this.condition.FilterRuleList[1].op = "and_contains";
    }

    if (this.searchText == "") {
      var length = this.condition.FilterRuleList.length;
      this.condition.FilterRuleList[1].value = this.searchText;
      this.condition.FilterRuleList[1].op = "";
    }
    if (types != undefined || name != undefined || this.searchText !=undefined) {
      this.userService.userGetSearchWithPaging(this.condition)
      .subscribe((data: any) => {
        this.users = data.itemList;
        this.pageSize = 5;
        this.page = 1;
        this.totalRecords = data.totalRows;
      }, (error) => {
      }, () => {
        
      })
    }
  }
  ngOnDestroy(): void {
    
  }
}
