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
import { OrganFilter } from '../../model/organ-filter.model';
import { QuanLyCoQuanService } from '../quan-ly-co-quan/quan-ly-co-quan-service.service';

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
  page = 1;
  previousPage : number;
  pageSize : number;
  totalRecords : number;
  lstOrgan: Array<Select2OptionData>;
  options: Options;
  color: string = "primary";
  mode: string = "indeterminate";
  value: number = 30;
  organFilterData: OrganFilter;
  condition: BaseCondition<Phong>;
  organArr : Array<Select2OptionData>;
  organNameArr: Array<Select2OptionData>;
  organAddressArr: Array<Select2OptionData>;
  valueOrganTypes: Array<string>;
  arrayTypeValue: string[];
  arrayNameValue: string[];
  arrayAddressValue: string[];

  constructor(
    private route: ActivatedRoute,
    public phongPopupService: QuanLyPhongPopupService,
    public phongService: QuanLyPhongService,
    private coQuanService: QuanLyCoQuanService
  ) {
    this.phong = new Phong();
    this.condition = new BaseCondition<CoQuan>();
    this.organArr = new Array<Select2OptionData>();
    this.organNameArr = new Array<Select2OptionData>();
    this.organAddressArr = new Array<Select2OptionData>();
    this.organFilterData = new OrganFilter();
    this.options = {
      width: "100%",
      closeOnSelect: true,
      multiple: true,
      tags: true
    }
   }

  ngOnInit() {
    this.loadFilterOptionsOrgan();
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
    if (id) {
      this.phongPopupService
        .open(PhongDeleteComponent as Component, id);
    } else {
      this.phongPopupService
        .open(PhongDeleteComponent as Component);
    }
  }

  loadPages(page : string) {
      var condi : BaseCondition<Phong> = new BaseCondition<Phong>();
      // if (this.condition.FilterRuleList != undefined) {
      //   condi.FilterRuleList = this.condition.FilterRuleList;
      // }
      condi.PageIndex = parseInt(page);
      this.phongService.getAllPhongWithPaging(condi).subscribe((data : any) => {
        console.log(data);
        this.phongs = data.itemList;
        this.pageSize = 5;
        this.page = parseInt(page);
        this.totalRecords = data.totalRows;
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
    this.phongService.getAllPhongWithPaging().subscribe((data: any) => {
      this.phongs = data.itemList;
      this.pageSize = 5;
      this.page = 1;
      this.totalRecords = data.totalRows;
    }, (error) => {
      console.log(error);
    }, () => {
      console.log('Lấy dữ liệu thành công.');
    });
  }

  loadFilterOptionsOrgan () {
    this.coQuanService.getAllOrgan()
      .subscribe((result) => {
      //  this.organFilterData = result;
        var arrTypes = [];
        for (const item of result.organName) {
          let value = { id: item, text: item }
          arrTypes.push(value);
        }
        this.organArr = arrTypes;
      }, 
      (error => {
        console.log(error)
      }),
      () => {
        // do something
        // this.arrayTypeValue = [this.organTypesArr[0].id, this.organTypesArr[1].id];
        // this.arrayNameValue = [this.organNameArr[0].id, this.organNameArr[1].id];
        // this.arrayAddressValue = [this.organAddressArr[0].id, this.organAddressArr[1].id];

      })
  }

  getFilterOptions (types: string[]) {
    this.condition.PageIndex = 1;
    this.condition.FilterRuleList = [
      {
        field: "scq.TenCoQuan",
        op: "",
        value: ""
      },
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
    
    if (types != undefined) {
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