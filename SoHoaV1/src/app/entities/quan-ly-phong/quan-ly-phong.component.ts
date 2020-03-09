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
import { QuanLyDanhMucService } from '../quan-ly-danh-muc/quan-ly-danh-muc.service';

@Component({
  selector: 'app-quan-ly-phong',
  templateUrl: './quan-ly-phong.component.html',
  styleUrls: ['./quan-ly-phong.component.css']
})
export class QuanLyPhongComponent implements OnInit, OnDestroy {
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
  fontArr: Array<Select2OptionData>;
  valueOrganTypes: Array<string>;
  arrayTypeValue: string[];
  arrayFontValue: string[];
  arrayAddressValue: string[];

  constructor(
    private route: ActivatedRoute,
    public phongPopupService: QuanLyPhongPopupService,
    public phongService: QuanLyPhongService,
    private danhMucService: QuanLyDanhMucService,
    private coQuanService: QuanLyCoQuanService
  ) {
    this.phong = new Phong();
    this.condition = new BaseCondition<Phong>();
    this.organArr = new Array<Select2OptionData>();
    this.fontArr = new Array<Select2OptionData>();
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
    try{
      var condi : BaseCondition<Phong> = new BaseCondition<Phong>();
      if (this.condition.FilterRuleList != undefined) {
        condi.FilterRuleList = this.condition.FilterRuleList;
      }
      condi.PageIndex = parseInt(page);
      this.phongService.getAllPhongWithPaging(condi).subscribe((data : any) => {
        this.phongs = data.itemList;
        this.pageSize = 5;
        this.page = parseInt(page);
        this.totalRecords = data.totalRows;
      }, (error) => {
        this.pageSize = 5;
      }, () => {
        console.log("Lấy dữ liệu thành công");
      });
    }catch (e) {
      alert(JSON.stringify(e))
    }
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
      }),
      () => {
      })

      this.danhMucService.getAllPhong()
      .subscribe((result) => {
        if (result != undefined) {
          var phongs = [];
          for (var item of result.itemList) {
            var temp = { id: item.fontID, text: item.fontName };
            phongs.push(temp);
          }
          this.fontArr = phongs;
        }
      },
      (error) => {
      }, () => {
      });
  }

  getFilterOptions (types: string[],fonts : string[]) {
    this.condition.PageIndex = 1;
    this.condition.FilterRuleList = [
      {
        field: "scq.TenCoQuan",
        op: "",
        value: ""
      },
      {
        field: "sp.PhongID",
        op: "",
        value: ""
      },
    ]
    this.arrayTypeValue = types;
    
    this.arrayFontValue = fonts;
    if (this.arrayTypeValue != undefined) {
      this.condition.FilterRuleList[0].value = types.toString();
      if (types.length == 1) {
        this.condition.FilterRuleList[0].op = "and_contains";
      }
      else {
        this.condition.FilterRuleList[0].op = "and_in_strings";
      }
    }

    if (this.arrayFontValue != undefined) {
      this.condition.FilterRuleList[1].value = fonts.toString();
      if (fonts.length == 1) {
        this.condition.FilterRuleList[1].op = "and_contains";
      }
      else {
        this.condition.FilterRuleList[1].op = "and_in_strings";
      }
    }
    
    if (types != undefined || fonts != undefined) {
      this.phongService.getAllPhongWithPaging(this.condition)
      .subscribe((data: any) => {
        this.phongs = data.itemList;
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