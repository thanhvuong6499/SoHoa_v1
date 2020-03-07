import { Component, OnInit } from '@angular/core';
import { DanhMuc } from '../../model/danh-muc.model';
import { danhmucs } from '../../model/danh-muc.model';
import { QuanLyDanhMucPopupService } from './quan-ly-danh-muc-popup.service';
import { DanhMucDialogComponent } from './danh-muc-dialog/danh-muc-dialog.component';
import { DanhMucDeleteComponent } from './danh-muc-delete/danh-muc-delete.component';
import { ActivatedRoute } from '@angular/router';
import {QuanLyDanhMucService} from './quan-ly-danh-muc.service';
import { ModalDirective, BsModalRef } from 'ngx-bootstrap';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap'
import { HttpResponse } from '@angular/common/http';
import { BaseCondition } from '../../common/BaseCondition';
import { Phong } from '../../model/phong.model';
import { CoQuan } from '../../model/co-quan.model';
import { QuanLyPhongService } from './../quan-ly-phong/quan-ly-phong.service';
import { Select2OptionData } from 'ng-select2';
import { Options } from 'select2';
import { QuanLyCoQuanService } from '../quan-ly-co-quan/quan-ly-co-quan-service.service';
import { OrganFilter } from '../../model/organ-filter.model';

@Component({
  selector: 'app-quan-ly-danh-muc',
  templateUrl: './quan-ly-danh-muc.component.html',
  styleUrls: ['./quan-ly-danh-muc.component.css']
})
export class QuanLyDanhMucComponent implements OnInit {

  // @ViewChild("modalPhong") public modalPhong: ModalDirective;
  phong: Phong;
  searchText: string ="";
  danhmucs: DanhMuc[];
  page = 1;
  danhmuc: DanhMuc;
  previousPage : number;
  pageSize : number;
  totalRecords : number;
  lstOrgan: Array<Select2OptionData>;
  options: Options;
  optionsFont :Options;
  lstFont: Array<Select2OptionData>;
  color: string = "primary";
  mode: string = "indeterminate";
  value: number = 30;
  organFilterData: OrganFilter;
  condition: BaseCondition<Phong>;
  organArr : Array<Select2OptionData>;
  fontArr: Array<Select2OptionData>;
  organAddressArr: Array<Select2OptionData>;
  valueOrganTypes: Array<string>;
  arrayTypeValue: string[];
  arrayNameValue: string[];


  constructor(
    private route: ActivatedRoute,
    private danhMucPopupService: QuanLyDanhMucPopupService,
    private danhMucService: QuanLyDanhMucService,
    private phongService: QuanLyPhongService,
    private coQuanService: QuanLyCoQuanService
    ) {
    this.condition = new BaseCondition<CoQuan>();
    this.organArr = new Array<Select2OptionData>();
    this.fontArr = new Array<Select2OptionData>();
    this.organFilterData = new OrganFilter();
    this.options = {
      width: "100%",
      closeOnSelect: true,
      multiple: true,
      tags: true
    }
    this.phong = new Phong();
    this.optionsFont = {
      multiple: false,
      theme: 'classic',
      closeOnSelect: true,
      width: "100%"
    }
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

  ngOnInit() {
    this.loadFilterOptionsOrgan();
    this.getAllCoQuan();
    this.getAllPhong();
    this.loadAll();
  }
  
  loadPages(page : number) {
    var condi : BaseCondition<DanhMuc> = new BaseCondition<DanhMuc>();
    condi.PageIndex = page;
    this.danhMucService.getAllDanhMucWithPaging(condi).subscribe((data : any) => {
      this.danhmucs = data.itemList;
      this.page = page;
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
  
  getAllPhong(){
    this.danhMucService.getAllPhong()
      .subscribe((result) => {
        if (result != undefined) {
          var phongs = [];
          for (var item of result.itemList) {
            var temp = { id: item.fontID, text: item.fontName };
            phongs.push(temp);
          }
          this.lstFont = phongs;
        }
      },
      (error) => {
        console.log(error);
      }, () => {
      });
  }
  loadAll(){
    this.danhMucService.getAllDanhMucWithPaging().subscribe((data : any) => {
      this.danhmucs = data.itemList;
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

      this.danhMucService.getAllPhong()
      .subscribe((result) => {
      //  this.organFilterData = result;
        var arrTypes = [];
        for (const item of result.itemList) {
          let value = { id: item.fontName, text: item.fontName }
          arrTypes.push(value);
        }
        this.fontArr = arrTypes;
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

  getFilterTypes(value : string[]) {
    if (value != undefined) {
      console.log(value.toString());
    }
    
  }

  getFilterName(value : string[]) {

  }

  getFilterOrganAddress(value: string[]) {

  }

  getFilterOptions (types: string[], name : string[]) {
    console.log(name);
    this.condition.PageIndex = 1;
    this.condition.FilterRuleList = [
      {
        field: "cq.TenCoQuan",
        op: "",
        value: ""
      },
      {
        field: "sp.TenPhong",
        op: "",
        value: ""
      },
    ]
    this.arrayTypeValue = types;
    this.arrayNameValue = name;
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

    if (types != undefined || name != undefined) {
      this.danhMucService.getAllDanhMucWithPaging(this.condition)
      .subscribe((data) => {
        this.danhmucs = data["itemList"];
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