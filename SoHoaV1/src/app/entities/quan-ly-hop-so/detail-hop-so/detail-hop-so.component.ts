import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { QuanLyHopSoService } from '../quan-ly-hop-so.service';
import { ActivatedRoute } from '@angular/router';
import { HoSo, hosos } from '../../../model/ho-so.model';
import { HopSo } from '../../../model/hop-so.model';
import { DateFormatter } from 'ngx-bootstrap';
import { QuanLyHoSoPopupService } from '../../quan-ly-ho-so/quan-ly-ho-so-popup.service';
import { HoSoDialogComponent } from '../../quan-ly-ho-so/ho-so-dialog/ho-so-dialog.component';
import { HoSoDeleteComponent } from '../../quan-ly-ho-so/ho-so-delete/ho-so-delete.component';
import { BaseCondition } from '../../../common';

@Component({
  selector: 'app-detail-hop-so',
  templateUrl: './detail-hop-so.component.html',
  styleUrls: ['./detail-hop-so.component.css']
})
export class DetailHopSoComponent implements OnInit {
  hosos: HoSo[];
  hopso: HopSo;
  page = 1;
  previousPage : number;
  pageSize : number;
  totalRecords : number;
  condition: BaseCondition<HoSo>;
  private subscription: Subscription;
  hopSoID: number = 0;
  private eventSubscriber: Subscription;
  constructor(
    private quanLyHopSoService: QuanLyHopSoService,
    private route: ActivatedRoute,
    private hosoPopupService: QuanLyHoSoPopupService
  ) {
      this.condition = new BaseCondition<HoSo>();
   }

  ngOnInit() {
    this.subscription = this.route.params.subscribe((params) => {
      this.load(params['id']);
    });
  }
  load(id){
    var params = id;
    this.quanLyHopSoService.getHopSoById(id)
    .subscribe((res=>{
        this.hopso = res.item;
    }));
    if(params != undefined){
      this.getHoSoByHopSoID(params);
    }
  }
  loadPages(page : string) {
    try{
      var condi : BaseCondition<HoSo> = new BaseCondition<HoSo>();
      if (this.condition.FilterRuleList != undefined) {
        condi.FilterRuleList = this.condition.FilterRuleList;
      }
      condi.PageIndex = parseInt(page);
      this.quanLyHopSoService.getListHoSoByHopSoId(condi).subscribe((data : any) => {
        this.hosos = data.itemList;
        this.pageSize = 5;
        this.page = parseInt(page);
        this.totalRecords = data.totalRows;
      }, (error) => {
        this.pageSize = 5;
      }, () => {
      });
    }catch (e) {
      alert(JSON.stringify(e))
    }
  }
  getHoSoByHopSoID(params : any){
    var condition : BaseCondition<HoSo> = new BaseCondition<HoSo>();
    this.condition.PageIndex = 1;
    this.condition.FilterRuleList = [
      {
        field: "hps.HopSoID",
        op: "",
        value: ""
      }
    ]
    this.hopSoID = parseInt(params);
    if (this.hopSoID != undefined) {
      this.condition.FilterRuleList[0].value = this.hopSoID.toString();
        this.condition.FilterRuleList[0].op = "and_contains";
    }
    this.quanLyHopSoService.getListHoSoByHopSoId(this.condition)
      .subscribe((res: any) => {
        this.hosos = res.itemList;
        this.pageSize = 5;
        this.page = 1;
        this.totalRecords = res.totalRows;
      })
  }
  openDialog(id?: number) {

    if (id) {
      this.hosoPopupService
        .open(HoSoDialogComponent as Component, id);

    } else {
      this.hosoPopupService
        .open(HoSoDialogComponent as Component);
    }

  }
  openDeleteDialog(id?: number) {
    if (id != undefined) {
      this.hosoPopupService
      .open(HoSoDeleteComponent as Component, id);
        
    } else {
      this.hosoPopupService
      .open(HoSoDeleteComponent as Component);
    }
  }

  ngOnDestroy(): void {

  }
}
