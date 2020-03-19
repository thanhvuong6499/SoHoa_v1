import { Component, OnInit, OnDestroy } from '@angular/core';
import { QuanLyCoQuanPopupService } from '../quan-ly-co-quan-popup.service';
import { CoQuan } from '../../../model/co-quan.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { QuanLyCoQuanService } from '../quan-ly-co-quan-service.service';
import { Phong, phongs } from '../../../model/phong.model';
import { BaseCondition } from '../../../common';
import { PhongDialogComponent } from '../../quan-ly-phong/phong-dialog/phong-dialog.component';
import { QuanLyPhongPopupService } from '../../quan-ly-phong/quan-ly-phong-popup.service';

@Component({
  selector: 'app-co-quan-detail',
  templateUrl: './co-quan-detail.component.html',
  styleUrls: ['./co-quan-detail.component.css']
})
export class CoQuanDetailComponent implements OnInit, OnDestroy {
  coQuan: CoQuan;
  phongs: Phong[] = new Array<Phong>();
  page = 1;
  totalRecords: number = 0;
  pageSize : number = 5;
  condition: BaseCondition<CoQuan> = new BaseCondition<CoQuan>();

  private subscription: Subscription;
  private eventSubscriber: Subscription;

  constructor(
    private quanLyCoQuanService: QuanLyCoQuanService,
    private route: ActivatedRoute,
    private phongPopupService: QuanLyPhongPopupService) {
      this.coQuan = new CoQuan();
    //  this.coQuan.coQuanID = 0;
    }
  ngOnInit() {
     this.subscription = this.route.params.subscribe((params) => {
       this.coQuan.coQuanID = parseInt(params['id']);
       this.load(params['id']);
       this.getFontsByOrganId(params['id']);
     });
  }

  load(id : number) {
  //  this.coQuan = this.quanLyCoQuanService.getCoQuanById(id);
    this.quanLyCoQuanService.getCoQuanById(id)
      .subscribe((result) => {
        this.coQuan = result.item;
      });
  }

  getFontsByOrganId (id : any) {
    var condi : BaseCondition<CoQuan> = new BaseCondition<CoQuan>();
    condi.PageIndex = 1;
    condi.PageSize = 5;
    var coquan: CoQuan = new CoQuan();
    coquan.coQuanID = id;
    condi.Item = coquan;
    this.quanLyCoQuanService.getFontsByOrganId(condi)
    .subscribe((result) => {
      this.phongs = result.itemList;
      this.totalRecords = result.totalRows;
      this.pageSize = 5;
      this.page = 1;
    })
  }

  loadPages (page : number) {
    var condi : BaseCondition<CoQuan> = new BaseCondition<CoQuan>();
    condi.PageIndex = page;
    condi.PageSize = 5;
    var coquan: CoQuan = new CoQuan();
    coquan.coQuanID = this.coQuan.coQuanID;
    condi.Item = coquan;
    this.quanLyCoQuanService.getFontsByOrganId(condi)
    .subscribe((result) => {
      this.phongs = result.itemList;
      this.totalRecords = result.totalRows;
      this.pageSize = 5;
      this.page = page;
    })

  }

  openDialog(id?: number) {
    debugger;
      this.phongPopupService
        .open(PhongDialogComponent as Component, id);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
