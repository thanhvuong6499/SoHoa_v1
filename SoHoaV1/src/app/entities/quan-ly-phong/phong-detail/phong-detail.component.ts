import { Component, OnInit } from '@angular/core';
import { Phong } from '../../../model/phong.model';
import { Subscription } from 'rxjs';
import { QuanLyPhongService } from '../quan-ly-phong.service';
import { ActivatedRoute } from '@angular/router';
import { DanhMuc, danhmucs } from '../../../model/danh-muc.model';

@Component({
  selector: 'app-phong-detail',
  templateUrl: './phong-detail.component.html',
  styleUrls: ['./phong-detail.component.css']
})
export class PhongDetailComponent implements OnInit {
  phong: Phong;
  danhmucs: DanhMuc[];
  private subscription: Subscription;
  private eventSubscriber: Subscription;
  constructor(
    private quanLyPhongService: QuanLyPhongService, 
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe((params) => {
      this.load(params['id']);
    });
  }
  load(id){
    this.phong= this.quanLyPhongService.getPhongById(id);
    this.danhmucs = this.quanLyPhongService.getListDanhMucByPhongId(id);

  }

}
