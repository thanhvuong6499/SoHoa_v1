import { Component, OnInit } from '@angular/core';
import { Document } from '../../model/document.model';
import { BaseCondition } from '../../common';
import { Options } from 'select2';
import { QuanLyTaiLieuService } from './quan-ly-tai-lieu.service';
import { QuanLyTaiLieuPopupService } from './quan-ly-tai-lieu-popup.service';
import { TaiLieuDialogComponent } from './tai-lieu-dialog/tai-lieu-dialog.component';
import { TaiLieuDeleteComponent } from './tai-lieu-delete/tai-lieu-delete.component';
import { Select2OptionData } from 'ng-select2';
@Component({
  selector: 'app-quan-ly-tai-lieu',
  templateUrl: './quan-ly-tai-lieu.component.html',
  styleUrls: ['./quan-ly-tai-lieu.component.css']
})
export class QuanLyTaiLieuComponent implements OnInit {
  public documents: Document[];
  public userRole: string;
  public roles : string;
  page = 1; 
  previousPage : number;
  pageSize : number;
  totalRecords : number;
  condition: BaseCondition<Document>;
  options: Options;
  arrayTypeValue: string[];
  arrayNameValue: string[];
  arrayAddressValue: string[];
  constructor(
    private taiLieuPopupService: QuanLyTaiLieuPopupService,
    private taiLieuService: QuanLyTaiLieuService
  ) { }

  ngOnInit() {
    this.userRole = localStorage.getItem('role');
    if (this.userRole === 'user') {
      this.roles = localStorage.getItem('roles');
      console.log(this.roles);
    }
    else {
      this.roles = 'admin';
    }
    this.loadAll();
  }
  openDialog(id?: number) {
    if (id) {
      this.taiLieuPopupService
        .open(TaiLieuDialogComponent as Component, id);
    } else {
      this.taiLieuPopupService
        .open(TaiLieuDialogComponent as Component);
    }

  }
  openDeleteDialog(id?: number) {
      this.taiLieuPopupService
        .open(TaiLieuDeleteComponent as Component, id);
  }
  loadPages(page : string) {
    console.log("da duoc click");
    try {
      var condi : BaseCondition<Document> = new BaseCondition<Document>();
      if (this.condition.FilterRuleList != undefined) {
        condi.FilterRuleList = this.condition.FilterRuleList;
      }
      condi.PageIndex = parseInt(page);
      this.taiLieuService.getAllTaiLieuWithPaging(condi).subscribe((data : any) => {
        this.documents = data.itemList;
        this.pageSize = 5;
        this.page = parseInt(page);
        this.totalRecords = data.totalRows
      }, (error) => {
        console.log(error);
      }, () => {

      });
    }
    catch (e) {
      alert(JSON.stringify(e))
    }
  }
  loadAll(){
    this.taiLieuService.getAllTaiLieuWithPaging().subscribe((data : any) => {
      this.documents = data.itemList;
      this.pageSize = 5;
      this.page = 1;
      this.totalRecords = data.totalRows;
    }, (error) => {
      console.log(error);
    }, () => {
      
    });
  }
  // openDialog(id?: number) {

  //   if (id) {
  //     this.taiLieuPopupService
  //       .open(TaiLieuDialogComponent as Component, id);
  //     console.log(id);

  //   } else {
  //     this.taiLieuPopupService
  //       .open(TaiLieuDialogComponent as Component);
  //   }

  // }
  // openDeleteDialog(id?: number) {

  //     this.taiLieuPopupService
  //       .open(TaiLieuDeleteComponent as Component, id);
  //     console.log(id);
  // }
  // loadPages(page : number) {
  //   // switch (page) {
  //   //   case 1:
  //   //     this.coquans = coquans;
  //   //     break;
  //   //   case 2:
  //   //     this.coquans = coquans2;
  //   //     break;
  //   //   case 3:
  //   //     this.coquans = coquans;
  //   //     break;
  //   //   default:
  //   //     break;
  //   // }
  getFilterTypes(value : string[]) {
    if (value != undefined) {
      console.log(value.toString());
    }
    
  }

  getFilterName(value : string[]) {

  }

  getFilterOrganAddress(value: string[]) {

  }

  getFilterOptions (types: string[], name : string[], address: string[]) {
    this.condition.PageIndex = 1;
    this.condition.FilterRuleList = [
      {
        field: "lcq.TenLoaiCoQuan",
        op: "",
        value: ""
      },
      {
        field: "cq.TenCoQuan",
        op: "",
        value: ""
      },
      {
        field: "dc.DiaChiChiTiet",
        op: "",
        value: ""
      }
    ]
    this.arrayTypeValue = types;
    this.arrayNameValue = name;
    this.arrayAddressValue = address;
    if (this.arrayTypeValue != undefined) {
      this.condition.FilterRuleList[0].value = types.toString();
      if (types.length == 1) {
        this.condition.FilterRuleList[0].op = "and_contains";
      }
      else {
        this.condition.FilterRuleList[0].op = "and_in_strings";
      }
    }
    if (this.arrayNameValue != undefined) {
      this.condition.FilterRuleList[1].value = name.toString();
      if (name.length == 1) {
        this.condition.FilterRuleList[1].op = "and_contains";
      }
      else {
        this.condition.FilterRuleList[1].op = "and_in_strings";
      }
    }
    if (this.arrayAddressValue != undefined) {
      this.condition.FilterRuleList[2].value = address.toString();
      if (address.length == 1) {
        this.condition.FilterRuleList[2].op = "and_contains";
      }
      else {
        this.condition.FilterRuleList[2].op = "and_in_strings";
      }
    }
    
    if (types != undefined || name != undefined || address != undefined) {
      this.taiLieuService.getAllTaiLieuWithPaging(this.condition)
      .subscribe((data) => {
        this.documents = data["itemList"];
        this.pageSize = 5;
        this.page = 1;
        this.totalRecords = data["totalRows"];
      }, (error) => {
        console.log(error);
      }, () => {
        
      })
    }
    
  }
  ngOnDestroy(): void {
    
  }
}
