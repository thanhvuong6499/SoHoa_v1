import { Component, OnInit } from '@angular/core';
import { DanhMuc } from '../../../model/danh-muc.model';
import { HopSo, hopsos } from '../../../model/hop-so.model';
import { Subscription } from 'rxjs';
import { QuanLyDanhMucService } from '../quan-ly-danh-muc.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-danh-muc-detail',
  templateUrl: './danh-muc-detail.component.html',
  styleUrls: ['./danh-muc-detail.component.css']
})
export class DanhMucDetailComponent implements OnInit {
  danhmuc: DanhMuc;
  hopsos: HopSo[];
  page = 1;
  private subscription: Subscription;
  private eventSubscriber: Subscription;
  constructor(
    private quanLyDanhMucService: QuanLyDanhMucService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe((params) => {
      this.load(params['id']);
    });
  }
  load(id){
    this.danhmuc= this.quanLyDanhMucService.getDanhMucById(id);
    this.hopsos= this.quanLyDanhMucService.getListHopSoByDanhMucId(id);
  }
  loadPages(page : number) {
    // switch (page) {
    //   case 1:
    //     this.coquans = coquans;
    //     break;
    //   case 2:
    //     this.coquans = coquans2;
    //     break;
    //   case 3:
    //     this.coquans = coquans;
    //     break;
    //   default:
    //     break;
    // }
  }
}
