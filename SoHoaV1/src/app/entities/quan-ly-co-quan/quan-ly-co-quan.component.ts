import { Component, OnInit, OnDestroy } from '@angular/core';
import { CoQuan } from '../../model/co-quan.model';
import { coquans, coquans2 } from '../../model/co-quan.model';
import { ActivatedRoute } from '@angular/router';
import { QuanLyCoQuanPopupService } from './quan-ly-co-quan-popup.service';
import { CoQuanDialogComponent } from './co-quan-dialog/co-quan-dialog.component';
import { CoQuanDeleteComponent } from './co-quan-delete/co-quan-delete.component';
import { QuanLyCoQuanService } from './quan-ly-co-quan-service.service';
import { HttpResponse } from '@angular/common/http';
import { BaseCondition } from '../../common/BaseCondition';

@Component({
  selector: 'app-quan-ly-co-quan',
  templateUrl: './quan-ly-co-quan.component.html',
  styleUrls: ['./quan-ly-co-quan.component.css']
})
export class QuanLyCoQuanComponent implements OnInit, OnDestroy {
  
  coquans: CoQuan[];
  coquan: CoQuan;
  page = 0;
  previousPage : number;
  pageSize : number;
  totalRecords : number;

  color: string = "primary";
  mode: string = "indeterminate";
  value: number = 30;
  constructor(
    private route: ActivatedRoute,
    private coQuanPopupService: QuanLyCoQuanPopupService,
    private coQuanService: QuanLyCoQuanService
  ) { }

  ngOnInit() {
    this.loadAll();
  }
  openDialog(id?: number) {
    if (id) {
      this.coQuanPopupService
        .open(CoQuanDialogComponent as Component, id);
    } else {
      this.coQuanPopupService
        .open(CoQuanDialogComponent as Component);
    }

  }
  // openDeleteDialog(id?: number) {
  //     this.coQuanPopupService
  //       .open(CoQuanDeleteComponent as Component, id);
  // }

  loadPages(page : number) {
    var condi : BaseCondition<CoQuan> = new BaseCondition<CoQuan>();
    condi.PageIndex = page;
    this.coQuanService.getAllCoQuanWithPaging(condi).subscribe((data : HttpResponse<CoQuan[]>) => {
      this.coquans = data.body["itemList"];
      this.pageSize = 5;
      this.page = page;
      this.totalRecords = data.body["totalRows"];
    }, (error) => {
      console.log(error);
    }, () => {
      console.log("Lấy dữ liệu thành công");
    });
  }
  loadAll(){
    this.coQuanService.getAllCoQuanWithPaging().subscribe((data : HttpResponse<CoQuan[]>) => {
      this.coquans = data.body["itemList"];
      this.pageSize = 5;
      this.page = 0;
      this.totalRecords = data.body["totalRows"];
    }, (error) => {
      console.log(error);
    }, () => {
      console.log('Lấy dữ liệu thành công.');
    });
  }

  deleteCoQuan(id: any) {
    if (confirm("Bạn có muốn xóa cơ quan có id = " + id + " ?"))
    {
      this.coQuanService.deleteCoQuan(id)
      .subscribe((result) => {
        console.log(result)
      },
      (error) => {
        alert("Xóa thất bại. Lỗi: " + JSON.stringify(error));
      });
    }
  }

  ngOnDestroy(): void {
    
  }
}

