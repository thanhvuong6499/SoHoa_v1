import { Component, OnInit } from '@angular/core';
import { VanBan } from '../../../model/van-ban.model';
import { Subscription } from 'rxjs';
import { QuanLyTaiLieuService } from '../quan-ly-tai-lieu.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tai-lieu-detail',
  templateUrl: './tai-lieu-detail.component.html',
  styleUrls: ['./tai-lieu-detail.component.css']
})
export class TaiLieuDetailComponent implements OnInit {
  vanban: VanBan;
  private subscription: Subscription;
  private eventSubscriber: Subscription;
  constructor(
    private quanLyTaiLieuService: QuanLyTaiLieuService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe((params) => {
      this.load(params['id']);
    });
  }
  load(id){
    this.vanban= this.quanLyTaiLieuService.getVanBanById(id);
  }

}
