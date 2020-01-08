import { Component, OnInit, OnDestroy } from '@angular/core';
import { QuanLyCoQuanPopupService } from '../quan-ly-co-quan-popup.service';
import { CoQuan } from '../../../model/co-quan.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { QuanLyCoQuanService } from '../quan-ly-co-quan-service.service';
import { Phong, phongs } from '../../../model/phong.model';

@Component({
  selector: 'app-co-quan-detail',
  templateUrl: './co-quan-detail.component.html',
  styleUrls: ['./co-quan-detail.component.css']
})
export class CoQuanDetailComponent implements OnInit, OnDestroy {

  coQuan: CoQuan;
  phongs: Phong[];
  private subscription: Subscription;
  private eventSubscriber: Subscription;

  constructor(
    private quanLyCoQuanService: QuanLyCoQuanService,
    private route: ActivatedRoute) {}
  ngOnInit() {
     this.subscription = this.route.params.subscribe((params) => {
       console.log(params['id']);
       this.load(params['id']);
     });
  }
  load(id : number) {
    this.coQuan = this.quanLyCoQuanService.getCoQuanById(id);
    this.phongs = this.quanLyCoQuanService.getListPhongByCoQuanId(id);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
