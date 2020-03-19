import { Component, OnInit, OnDestroy } from '@angular/core';
import { QuanLyCoQuanPopupService } from '../quan-ly-co-quan-popup.service';
import { CoQuan } from '../../../model/co-quan.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { QuanLyCoQuanService } from '../quan-ly-co-quan-service.service';
import { Phong, phongs } from '../../../model/phong.model';
import { BaseCondition } from '../../../common';
import { QuanLyPhongPopupService } from '../../quan-ly-phong/quan-ly-phong-popup.service';
import { PhongDialogComponent } from '../../quan-ly-phong/phong-dialog/phong-dialog.component';

@Component({
  selector: 'app-co-quan-detail',
  templateUrl: './co-quan-detail.component.html',
  styleUrls: ['./co-quan-detail.component.css']
})
export class CoQuanDetailComponent implements OnInit, OnDestroy {

  coQuan: CoQuan;
  phongs: Phong[];
  page = 1;
  previousPage : number;
  pageSize : number;
  totalRecords : number;
  data: any;
  organID: number = 0;
  condition: BaseCondition<Phong>;

  private subscription: Subscription;
  private eventSubscriber: Subscription;

  constructor(
    private quanLyCoQuanService: QuanLyCoQuanService,
    private route: ActivatedRoute,
    private phongPopupService: QuanLyPhongPopupService
    ) { 
      this.coQuan = new CoQuan();
      this.condition = new BaseCondition<Phong>();
    }
  ngOnInit() {
    this.subscription = this.route.params.subscribe((params) => {
      this.load(params['id']);
    });
  }
  load(id : number) {
    this.quanLyCoQuanService.getCoQuanById(id)
      .subscribe((result) => {
        this.coQuan = result.item;
      });
    if(id != undefined){
      this.getFontByOrganID(id);
    }

  }

  getFontByOrganID(params : any){
    var condition : BaseCondition<Phong> = new BaseCondition<Phong>();
    this.condition.PageIndex = 1;
    this.condition.FilterRuleList = [
      {
        field: "sp.CoQuanID",
        op: "",
        value: ""
      }
    ]
    this.organID = parseInt(params);
    if (this.organID != undefined) {
      this.condition.FilterRuleList[0].value = this.organID.toString();
        this.condition.FilterRuleList[0].op = "and_contains";
    }
    this.quanLyCoQuanService.getListFontByOrganId(this.condition)
      .subscribe((res: any) => {
        this.phongs = res.itemList;
        this.pageSize = 5;
        this.page = 1;
        this.totalRecords = res.totalRows;
      })
  }
  
  loadPages(page : string) {
    try{
      var condi : BaseCondition<Phong> = new BaseCondition<Phong>();
      if (this.condition.FilterRuleList != undefined) {
        condi.FilterRuleList = this.condition.FilterRuleList;
      }
      condi.PageIndex = parseInt(page);
      this.quanLyCoQuanService.getListFontByOrganId(condi).subscribe((data : any) => {
        this.phongs = data.itemList;
        this.pageSize = 5;
        this.page = parseInt(page);
        this.totalRecords = data.totalRows;
      }, (error) => {
        this.pageSize = 5;
      }, () => {
        console.log("Lấy dữ liệu thành công");
      });
    }catch (e) {
      alert(JSON.stringify(e))
    }
  }

  openDialog(id?: number) {

    if (id) {
      this.phongPopupService
        .open(PhongDialogComponent as Component, id);

    } else {
      this.phongPopupService
        .open(PhongDialogComponent as Component);
    }

  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
