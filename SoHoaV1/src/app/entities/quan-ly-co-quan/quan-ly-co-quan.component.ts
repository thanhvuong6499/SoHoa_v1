import { Component, OnInit, OnDestroy } from '@angular/core';
import { CoQuan } from '../../model/co-quan.model';
import { coquans, coquans2 } from '../../model/co-quan.model';
import { ActivatedRoute } from '@angular/router';
import { QuanLyCoQuanPopupService } from './quan-ly-co-quan-popup.service';
import { CoQuanDialogComponent } from './co-quan-dialog/co-quan-dialog.component';
import { CoQuanDeleteComponent } from './co-quan-delete/co-quan-delete.component';
import { QuanLyCoQuanService } from './quan-ly-co-quan-service.service';
import { HttpResponse } from '@angular/common/http';
import { BaseCondition } from '../../common/BaseCondition';
import { Options } from 'select2';
import { Select2OptionData } from 'ng-select2';
import { OrganFilter } from '../../model/organ-filter.model';

@Component({
  selector: 'app-quan-ly-co-quan',
  templateUrl: './quan-ly-co-quan.component.html',
  styleUrls: ['./quan-ly-co-quan.component.css']
})
export class QuanLyCoQuanComponent implements OnInit, OnDestroy {
  
  coquans: CoQuan[];
  coquan: CoQuan;
  page = 0; 
  previousPage : number;
  pageSize : number;
  totalRecords : number;
  condition: BaseCondition<CoQuan>;
  options: Options;
  organFilterData: OrganFilter;

  color: string = "primary";
  mode: string = "indeterminate";
  value: number = 30;
  organTypesArr : Array<Select2OptionData>;
  organNameArr: Array<Select2OptionData>;
  organAddressArr: Array<Select2OptionData>;
  valueOrganTypes: Array<string>;
  arrayTypeValue: string[];
  arrayNameValue: string[];
  arrayAddressValue: string[];

  constructor(
    private route: ActivatedRoute,
    private coQuanPopupService: QuanLyCoQuanPopupService,
    private coQuanService: QuanLyCoQuanService
  ) { 
    this.condition = new BaseCondition<CoQuan>();
    this.organTypesArr = new Array<Select2OptionData>();
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
      this.coQuanPopupService
        .open(CoQuanDialogComponent as Component, id);
    } else {
      this.coQuanPopupService
        .open(CoQuanDialogComponent as Component);
    }

  }
  openDeleteDialog(id?: number) {
      this.coQuanPopupService
        .open(CoQuanDeleteComponent as Component, id);
  }

  loadPages(page : number) {
    var condi : BaseCondition<CoQuan> = new BaseCondition<CoQuan>();
    condi.PageIndex = page;
    this.coQuanService.getAllCoQuanWithPaging(condi).subscribe((data : any) => {
      this.coquans = data.body["itemList"];
      this.pageSize = 5;
      this.page = page;
      this.totalRecords = data.body["totalRows"];
    }, (error) => {
      console.log(error);
    }, () => {
      console.log("Lấy dữ liệu thành công");
    });
  }
  loadAll(){
    this.coQuanService.getAllCoQuanWithPaging().subscribe((data : any) => {
      console.log(data);
      this.coquans = data.body["itemList"];
      this.pageSize = 5;
      this.page = 0;
      this.totalRecords = data.body["totalRows"];
    }, (error) => {
      console.log(error);
    }, () => {
      console.log('Lấy dữ liệu thành công.');
    });
  }

  // deleteCoQuan(id: any) {
  //   if (confirm("Bạn có muốn xóa cơ quan có id = " + id + " ?"))
  //   {
      
  //   }
  // }
  loadFilterOptionsOrgan () {
    this.coQuanService.getAllOrgan()
      .subscribe((result) => {
      //  this.organFilterData = result;
        var arrTypes = [];
        for (const item of result.organTypes) {
          let value = { id: item, text: item }
          arrTypes.push(value);
        }
        this.organTypesArr = arrTypes;
        arrTypes = [];
        for (const item of result.organName) {
          let value = { id: item, text: item }
          arrTypes.push(value);
        }
        this.organNameArr = arrTypes;
        arrTypes = [];
        for (const item of result.organAddress) {
          let value = { id: item, text: item }
          arrTypes.push(value);
        }
        this.organAddressArr = arrTypes;
        
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

  getFilterOptions (types: string[], name : string[], address: string[]) {

    this.condition.FilterRuleList = [
      {
        field: "TenLoaiCoQuan",
        op: "",
        value: ""
      },
      {
        field: "TenCoQuan",
        op: "",
        value: ""
      },
      {
        field: "AddressDetail",
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
    
    console.log(this.condition);
    
    this.coQuanService.getAllCoQuanWithPaging(this.condition)
      .subscribe((result) => {
        console.log(result);
      })
  }

  ngOnDestroy(): void {
    
  }
}

