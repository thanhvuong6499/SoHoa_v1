import { Component, OnInit } from '@angular/core';
import { DanhMuc } from '../../../model/danh-muc.model';
import { HopSo, hopsos } from '../../../model/hop-so.model';
import { Subscription } from 'rxjs';
import { QuanLyDanhMucService } from '../quan-ly-danh-muc.service';
import { ActivatedRoute } from '@angular/router';
import { BaseCondition } from '../../../common';
import {QuanLyHopSoService} from '../../quan-ly-hop-so/quan-ly-hop-so.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-danh-muc-detail',
  templateUrl: './danh-muc-detail.component.html',
  styleUrls: ['./danh-muc-detail.component.css']
})
export class DanhMucDetailComponent implements OnInit {
  danhmuc: DanhMuc;
  danhmucs: DanhMuc[];
  page = 0;
  hopsos: HopSo[];
  previousPage : number;
  pageSize : number;
  totalRecords : number;
  isEdit = false;
  value1 = 'Default';
  defaultValue : string;
  data: any;
  private subscription: Subscription;
  private eventSubscriber: Subscription;
  constructor(
    private quanLyDanhMucService: QuanLyDanhMucService,
    private route: ActivatedRoute,
    private quanLyHopSoService: QuanLyHopSoService
  ) { }

  ngOnInit() {
    this.route.snapshot.paramMap.get('id');
    this.subscription = this.route.params.subscribe((params) => {
      this.load(params['id']);
    });
  }
  load(id){
    var params = id;
    this.quanLyDanhMucService.getDanhMucById(id)
      .subscribe((result) => {
        this.danhmuc = result.item;
      });
      var condi : BaseCondition<HopSo> = new BaseCondition<HopSo>();
      condi.PageIndex =this.page;
      condi.IN_WHERE =params;
      (this.quanLyHopSoService.getListHopSoByDanhMucId(condi))
        .subscribe((res) => {
          this.danhmucs = res.body["itemList"];
          this.pageSize = 5;
          this.page = 0;
          this.totalRecords = res.body["totalRows"];
        })
    
  }
  loadPages(page : number,id: any) {
    var params = id;
    var condi : BaseCondition<HopSo> = new BaseCondition<HopSo>();
    condi.PageIndex = page;
    condi.IN_WHERE=params;
    this.quanLyHopSoService.getListHopSoByDanhMucId(params).subscribe((data : HttpResponse<DanhMuc[]>) => {
      this.danhmucs = data.body["itemList"];
      this.page = page;
      this.totalRecords = data.body["totalRows"];
    }, (error) => {
      this.pageSize = 5;
    }, () => {
      console.log("Lấy dữ liệu thành công");
    });
  }
  ngOnDestroy(): void {
    // if(this.subscription){
    //   this.subscription.unsubscribe();
    // }
  }
}
