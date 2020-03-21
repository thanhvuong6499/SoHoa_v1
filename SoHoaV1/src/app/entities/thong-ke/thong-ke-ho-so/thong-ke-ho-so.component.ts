import { Component, OnInit } from '@angular/core';
import { BaseCondition } from '../../../common';
import { ActivatedRoute } from '@angular/router';
import { QuanLyHopSoService } from '../../quan-ly-hop-so/quan-ly-hop-so.service';
import { ThongKeService } from '../thong-ke.service';
import { HopSo } from '../../../model/hop-so.model';
import { HoSo } from '../../../model/ho-so.model';
import { QuanLyHoSoService } from '../../quan-ly-ho-so/quan-ly-ho-so.service';

@Component({
  selector: 'app-thong-ke-ho-so',
  templateUrl: './thong-ke-ho-so.component.html',
  styleUrls: ['./thong-ke-ho-so.component.css']
})
export class ThongKeHoSoComponent implements OnInit {
  hosos: HoSo[];
  hoso: HoSo;
  searchText: string = "";
  page = 1;
  previousPage : number;
  pageSize : number;
  totalRecords : number;
  condition: BaseCondition<HoSo>;
  link: string = "";

  constructor( 
    private route: ActivatedRoute,
    public service: QuanLyHoSoService,
    private thongKeService: ThongKeService
    ) { }

  ngOnInit() {
    this.getLinkExportHoSo();
    this.loadAll();
  }

  loadPages(page : string) {
    try{
      var condi : BaseCondition<HoSo> = new BaseCondition<HoSo>();
      if(this.condition!=undefined){
        if (this.condition.FilterRuleList != undefined) {
          condi.FilterRuleList = this.condition.FilterRuleList;
        }
      }
      condi.PageIndex = parseInt(page);
      this.service.getAllProfilesWithPaging(condi).subscribe((data : any) => {
        this.hosos = data.itemList;
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
 
  loadAll(){
    this.service.getAllProfilesWithPaging().subscribe((data: any) => {
      this.hosos = data.itemList;
      this.pageSize = 5;
      this.page = 1;
      this.totalRecords = data.totalRows;
    }, (error) => {
    }, () => {
      console.log('Lấy dữ liệu thành công.');
    });
  }

  getLinkExportHoSo(){
    this.link =  this.thongKeService.getLinkExportHoSo();
  }
}
