import { Component, OnInit } from '@angular/core';
import { HoSo } from '../../model/ho-so.model';
import { QuanLyHoSoPopupService } from './quan-ly-ho-so-popup.service';
import { HoSoDialogComponent } from './ho-so-dialog/ho-so-dialog.component';
import { HoSoDeleteComponent } from './ho-so-delete/ho-so-delete.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Select2OptionData } from 'ng-select2';
import { Options } from 'select2';
import { BaseCondition } from '../../common';
import { QuanLyHoSoService } from './quan-ly-ho-so.service';

@Component({
  selector: 'app-quan-ly-ho-so',
  templateUrl: './quan-ly-ho-so.component.html',
  styleUrls: ['./quan-ly-ho-so.component.css']
})
export class QuanLyHoSoComponent implements OnInit {
  hoso: HoSo;
  lstHoSo: HoSo[] = new Array<HoSo>();
  page = 1;
  pageSize: number;
  totalRecords: number;
  options: Options;
  condition: BaseCondition<HoSo> = new BaseCondition<HoSo>();

  // filter item
  gearBoxIdFilter : Array<Select2OptionData>;
  profileIdFilter: Array<Select2OptionData>;
  profileNameFilter: Array<Select2OptionData>;
  arrayIdValue: string[];
  arrayTitleValue: string[];
  arrayGearBoxValue: string[];
  //
  constructor(
    private hoSoPopupService: QuanLyHoSoPopupService,
    private activeModal: NgbActiveModal,
    private service: QuanLyHoSoService
  ) {
    this.gearBoxIdFilter = new Array<Select2OptionData>();
    this.profileIdFilter = new Array<Select2OptionData>();
    this.profileNameFilter = new Array<Select2OptionData>();
    this.options = {
      width: '100%',
      closeOnSelect: true,
      multiple: true,
      tags: true,
    }
   }

  ngOnInit() {
    this.loadFilterOptions();
    this.loadData();
  }
  openDialog(id?: number) {

    if (id) {
      this.hoSoPopupService
        .open(HoSoDialogComponent as Component, id);
    } else {
      this.hoSoPopupService
        .open(HoSoDialogComponent as Component);
    }
  }
  openDeleteDialog(id?: number) {

      this.hoSoPopupService
        .open(HoSoDeleteComponent as Component, id);
      console.log(id);
  }

  loadData (condi?: BaseCondition<HoSo>) {
    this.service.getAllProfilesWithPaging(condi)
      .subscribe((result) => {
        if (result.isSuccess) {
          this.lstHoSo = result.itemList;
          this.totalRecords = result.totalRows;
          if (condi != undefined)
          {
            this.pageSize = condi.PageSize;
            this.page = condi.PageIndex;
          }
          else {
            this.pageSize = 5;
            this.page = 1;
          }
        }
        else {
          alert("Lỗi: " + result.errorMessage);
        }
      })
  }

  loadPages(page : number, pageSize: number) {
    var condition: BaseCondition<HoSo> = new BaseCondition<HoSo>();
    if (this.condition.FilterRuleList) {
      condition.FilterRuleList = this.condition.FilterRuleList;
    }
    condition.PageIndex = page;
    condition.PageSize = pageSize || 5;
    this.loadData(condition);
  }

  loadFilterOptions () {
    this.service.getAllProfiles()
      .subscribe((result) => {
          var arrTypes = [];
          for (const item of result.lstFileCode) {
            let value = { id: item, text: item }
            arrTypes.push(value);
          }
          this.profileIdFilter = arrTypes;
          arrTypes = [];
          for (const item of result.lstTitle) {
            let value = { id: item, text: item }
            arrTypes.push(value);
          }
          this.profileNameFilter = arrTypes;
          arrTypes = [];
          for (const item of result.lstGearBoxTitle) {
            let value = { id: item, text: item }
            arrTypes.push(value);
          }
          this.gearBoxIdFilter = arrTypes;
        }, 
      (error => {
        console.log(error)
      }),
      () => {

      });
  }
  getFilterOptions(id: string[], title: string [], gbx: string[]) {
    this.condition.PageIndex = 1;
    this.condition.FilterRuleList = [
      {
        field: "hs.MaHoSo",
        op: "",
        value: ""
      },
      {
        field: "hs.TieuDeHoSo",
        op: "",
        value: ""
      },
      {
        field: "hps.TieuDeHopSo",
        op: "",
        value: ""
      }
    ]
    this.arrayIdValue = id;
    this.arrayTitleValue = title;
    this.arrayGearBoxValue = gbx;
    if (this.arrayIdValue != undefined) {
      this.condition.FilterRuleList[0].value = id.toString();
      if (id.length == 1) {
        this.condition.FilterRuleList[0].op = "and_contains";
      }
      else {
        this.condition.FilterRuleList[0].op = "and_in_strings";
      }
    }
    if (this.arrayTitleValue != undefined) {
      this.condition.FilterRuleList[1].value = title.toString();
      if (title.length == 1) {
        this.condition.FilterRuleList[1].op = "and_contains";
      }
      else {
        this.condition.FilterRuleList[1].op = "and_in_strings";
      }
    }
    if (this.arrayGearBoxValue != undefined) {
      this.condition.FilterRuleList[2].value = gbx.toString();
      if (gbx.length == 1) {
        this.condition.FilterRuleList[2].op = "and_contains";
      }
      else {
        this.condition.FilterRuleList[2].op = "and_in_strings";
      }
    }
    
    if (id != undefined || title != undefined || gbx != undefined) {
      this.service.getAllProfilesWithPaging(this.condition)
      .subscribe((data) => {
        this.lstHoSo = data.itemList;
        this.pageSize = 5;
        this.page = 1;
        this.totalRecords = data.totalRows;
      }, (error) => {
        console.log(error);
      }, () => {
        
      })
    }
  }
}
