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
  page = 0;
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
  constructor(
    private route: ActivatedRoute,
    private danhMucPopupService: QuanLyDanhMucPopupService,
    private danhMucService: QuanLyDanhMucService,
    private phongService: QuanLyPhongService,
    ) {
      this.phong = new Phong();
      this.options = {
        multiple: false,
        theme: 'classic',
        closeOnSelect: true,
        width: "100%"
      }
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
    this.loadAll();
  }
  
  loadPages(page : number) {
    var condi : BaseCondition<DanhMuc> = new BaseCondition<DanhMuc>();
    condi.PageIndex = page;
    this.danhMucService.getAllDanhMucWithPaging(condi).subscribe((data : HttpResponse<DanhMuc[]>) => {
      this.danhmucs = data.body["itemList"];
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
    this.danhMucService.getAllDanhMucWithPaging().subscribe((data : HttpResponse<DanhMuc[]>) => {
      this.danhmucs = data.body["itemList"];
      this.pageSize = 5;
      this.page = 0;
      this.totalRecords = data.body["totalRows"];
    }, (error) => {
      console.log(error);
    }, () => {
      console.log('Lấy dữ liệu thành công.');
    });
  }

  ngOnDestroy(): void {
    
  }
}