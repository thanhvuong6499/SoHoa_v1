import { ModalDirective, BsModalRef } from 'ngx-bootstrap';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap'
import { QuanLyPhongPopupService } from './quan-ly-phong-popup.service';
import { phongs } from '../../model/phong.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Phong } from '../../model/phong.model';
import { ActivatedRoute } from '@angular/router';
import { PhongDialogComponent } from './phong-dialog/phong-dialog.component';
import { PhongDeleteComponent } from './phong-delete/phong-delete.component';
import { QuanLyPhongService } from './quan-ly-phong.service';
import { HttpResponse } from '@angular/common/http';
import { BaseCondition } from '../../common/BaseCondition';
import { Select2OptionData } from 'ng-select2';
import { Options } from 'select2';
import { CoQuan } from '../../model/co-quan.model';

@Component({
  selector: 'app-quan-ly-phong',
  templateUrl: './quan-ly-phong.component.html',
  styleUrls: ['./quan-ly-phong.component.css']
})
export class QuanLyPhongComponent implements OnInit {
  // @ViewChild("modalPhong") public modalPhong: ModalDirective;
  phongs: Phong[];
  phong: Phong;
  searchText: string = "";
  page = 0;
  previousPage : number;
  pageSize : number;
  totalRecords : number;
  lstOrgan: Array<Select2OptionData>;
  options: Options;
  color: string = "primary";
  mode: string = "indeterminate";
  value: number = 30;
  condition: BaseCondition<Phong>;
  arrayOrgan: string[];

  constructor(
    private route: ActivatedRoute,
    public phongPopupService: QuanLyPhongPopupService,
    public phongService: QuanLyPhongService
  ) {
    this.phong = new Phong();
    this.options = {
      multiple: false,
      theme: 'classic',
      closeOnSelect: true,
      width: "100%"
    }
   }

  ngOnInit() {
    this.getAllCoQuan();
    this.loadAll();
  }

  openDialog(id?: number) {
    if (id) {
      this.phongPopupService
        .open(PhongDialogComponent as Component, id);
    } else {
      this.phongPopupService
        .open(PhongDialogComponent as Component);
    }

  }
  openDeleteDialog(id?: number) {
    console.log(id);
    debugger;
    if (id) {
      this.phongPopupService
        .open(PhongDeleteComponent as Component, id);
    } else {
      this.phongPopupService
        .open(PhongDeleteComponent as Component);
    }
  }

  loadPages(page : number) {
      var condi : BaseCondition<Phong> = new BaseCondition<Phong>();
      // if (this.condition.FilterRuleList != undefined) {
      //   condi.FilterRuleList = this.condition.FilterRuleList;
      // }
      condi.PageIndex = page;
      this.phongService.getAllPhongWithPaging(condi).subscribe((data : HttpResponse<Phong[]>) => {
        this.phongs = data.body["itemList"];
        this.page = page;
        this.totalRecords = data.body["totalRows"];
      }, (error) => {
        console.log(error);
        this.pageSize = 5;
      }, () => {
        console.log("Lấy dữ liệu thành công");
      });
  }
  getAllCoQuan() {
    this.phongService.getAllCoQuan()
      .subscribe((result) => {
        if (result != undefined) {
          var organs = [];
          for (var item of result.itemList) {
            var temp = { id: item.organID, text: item.tenCoQuan };
            organs.push(temp);
          }
          this.lstOrgan = organs;
        }
      },
      (error) => {
        console.log(error);
      }, () => {
      });
  }
  loadAll(){
    if(this.phong.organID != undefined){
    }
    this.phongService.getAllPhongWithPaging().subscribe((data : HttpResponse<Phong[]>) => {
      this.phongs = data.body["itemList"];
      this.pageSize = 5;
      this.page = 0;
      this.totalRecords = data.body["totalRows"];
    }, (error) => {
      console.log(error);
    }, () => {
      console.log('Lấy dữ liệu thành công.');
    });
  }
  getFilterOptions (organ: string[]) {
    this.condition.PageIndex = 1;
    this.condition.FilterRuleList = [
      {
        field: "",
        op: "",
        value: ""
      }
    ]
    this.arrayOrgan = organ;
    if (this.arrayOrgan != undefined) {
      this.condition.FilterRuleList[0].value = organ.toString();
      if (organ.length == 1) {
        this.condition.FilterRuleList[0].op = "and_contains";
      }
      else {
        this.condition.FilterRuleList[0].op = "and_in_strings";
      }
    }
    if (organ != undefined || name != undefined || organ != undefined) {
      this.phongService.getAllPhongWithPaging(this.condition)
      .subscribe((data) => {
        this.phongs = data["itemList"];
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