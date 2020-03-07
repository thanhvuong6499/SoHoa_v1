import { Component, OnInit } from '@angular/core';
import { Phong } from '../../../model/phong.model';
import { Subscription } from 'rxjs';
import { QuanLyPhongService } from '../quan-ly-phong.service';
import { ActivatedRoute } from '@angular/router';
import { DanhMuc, danhmucs } from '../../../model/danh-muc.model';
import { BaseCondition } from '../../../common/BaseCondition';
import { HttpResponse } from '@angular/common/http';
import { stringify } from 'querystring';  

@Component({
  selector: 'app-phong-detail',
  templateUrl: './phong-detail.component.html',
  styleUrls: ['./phong-detail.component.css']
})
export class PhongDetailComponent implements OnInit {
  phong: Phong;
  danhmucs: DanhMuc[];
  page = 1;
  previousPage : number;
  pageSize : number;
  totalRecords : number;
  isEdit = false;
  value1 = 'Default';
  defaultValue : string;
  data: any;
//  organTypeList: Select2Data;
  private subscription: Subscription;
  private eventSubscriber: Subscription;
  constructor(
    private quanLyPhongService: QuanLyPhongService, 
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.load(this.route.snapshot.paramMap.get('id'));
    this.subscription = this.route.params.subscribe((params) => {
      this.load(params['id']);
    });
  }
  load(id){
    var params = id;
    (this.quanLyPhongService.getPhongById(params))
      .subscribe((result) => {
        this.phong = result.item;
      });
    var condi : BaseCondition<Phong> = new BaseCondition<Phong>();
    condi.PageIndex =this.page;
    condi.IN_WHERE =params;
    (this.quanLyPhongService.getListDanhMucByPhongId(condi))
      .subscribe((res) => {
        this.danhmucs = res.body["itemList"];
        this.pageSize = 5;
        this.page = 1;
        this.totalRecords = res.body["totalRows"];
      })
  }
  loadPages(page : number,id: any) {
    var params = id;
    var condi : BaseCondition<Phong> = new BaseCondition<Phong>();
    condi.PageIndex = page;
    condi.IN_WHERE= String(params);
    this.quanLyPhongService.getListDanhMucByPhongId(condi).subscribe((data : HttpResponse<DanhMuc[]>) => {
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
