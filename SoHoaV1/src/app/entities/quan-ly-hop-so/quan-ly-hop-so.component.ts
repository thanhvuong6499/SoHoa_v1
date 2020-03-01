import { Component, OnInit } from '@angular/core';
import { HopSo } from '../../model/hop-so.model';
import { hopsos } from '../../model/hop-so.model';
import { QuanLyHopSoPopupService } from './quan-ly-hop-so-popup.service';
import { HopSoDialogComponent } from './hop-so-dialog/hop-so-dialog.component';
import { HopSoDeleteComponent } from './hop-so-delete/hop-so-delete.component';
import {QuanLyHopSoService} from './quan-ly-hop-so.service';
import { HttpResponse } from '@angular/common/http';
import { BaseCondition } from '../../common/BaseCondition';
import { Select2OptionData } from 'ng-select2';
import { Options } from 'select2';
import { DanhMuc } from '../../model/danh-muc.model';
import {QuanLyDanhMucService} from '../quan-ly-danh-muc/quan-ly-danh-muc.service';
@Component({
  selector: 'app-quan-ly-hop-so',
  templateUrl: './quan-ly-hop-so.component.html',
  styleUrls: ['./quan-ly-hop-so.component.css']
})
export class QuanLyHopSoComponent implements OnInit {
  danhmuc: DanhMuc;
  hopsos: HopSo[];
  page = 0;
  previousPage : number;
  pageSize : number;
  totalRecords : number;
  lstDanhMuc: Array<Select2OptionData>;
  options: Options;

  
  constructor(
    private hopSoPopupService: QuanLyHopSoPopupService, 
    private danhMucService: QuanLyDanhMucService,
    private quanLyHopSoService: QuanLyHopSoService,
  ) { 
      this.danhmuc = new DanhMuc();
        this.options = {
          multiple: false,
          theme: 'classic',
          closeOnSelect: true,
          width: "100%"
        }
    }

  ngOnInit() {
    this.getAllDanhMuc();
    this.loadAll();
  }
  openDialog(id?: number) {

    if (id) {
      this.hopSoPopupService
        .open(HopSoDialogComponent as Component, id);
      console.log(id);

    } else {
      this.hopSoPopupService
        .open(HopSoDialogComponent as Component);
    }

  }
  openDeleteDialog(id?: number) {

      this.hopSoPopupService
        .open(HopSoDeleteComponent as Component, id);
      console.log(id);
  }
  loadPages(page : number) {
    var condi : BaseCondition<HopSo> = new BaseCondition<HopSo>();
    condi.PageIndex = page;
    this.quanLyHopSoService.getAllHopSoWithPaging(condi).subscribe((data : HttpResponse<HopSo[]>) => {
      this.hopsos = data.body["itemList"];
      this.page = page;
      this.totalRecords = data.body["totalRows"];
    }, (error) => {
      console.log(error);
      this.pageSize = 5;
    }, () => {
      console.log("Lấy dữ liệu thành công");
    });
  }

  getAllDanhMuc() {
    this.danhMucService.getAllDanhMuc()
      .subscribe((result) => {
        if (result != undefined) {
          var danhmucs = [];
          for (var item of result.itemList) {
            var temp = { id: item.tabOfContID, text: item.tabOfContName };
            danhmucs.push(temp);
          }
          this.lstDanhMuc = danhmucs;
        }
      },
      (error) => {
        console.log(error);
      }, () => {
      });
  }

  loadAll(){
    this.quanLyHopSoService.getAllHopSoWithPaging().subscribe((data : HttpResponse<HopSo[]>) => {
      this.hopsos = data.body["itemList"];
      this.pageSize = 5;
      this.page = 0;
      this.totalRecords = data.body["totalRows"];
    }, (error) => {
      console.log(error);
    }, () => {
      console.log('Lấy dữ liệu thành công.');
    });
  }
}
