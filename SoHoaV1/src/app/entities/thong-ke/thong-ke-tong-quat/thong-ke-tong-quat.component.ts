import { Component, OnInit } from '@angular/core';
import { BaseCondition, ApiUrl } from '../../../common';
import { ActivatedRoute } from '@angular/router';
import { ThongKeService } from '../thong-ke.service';
import { ThongKe, FilterDTO } from '../../../model/thong-ke';
import { UserService } from '../../quan-ly-nguoi-dung/user.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-thong-ke-tong-quat',
  templateUrl: './thong-ke-tong-quat.component.html',
  styleUrls: ['./thong-ke-tong-quat.component.css']
})
export class ThongKeTongQuatComponent implements OnInit {
  thongKes: ThongKe[];
  thongKe: ThongKe;
  searchText: string = "";
  page = 1;
  previousPage : number;
  pageSize : number;
  totalRecords : number;
  condition: BaseCondition<FilterDTO>;
  link: string = "";

  constructor( 
    private route: ActivatedRoute,
    private service: ThongKeService,
    private userService: UserService,
    private spinner: NgxSpinnerService
    ) 
    {
      this.condition = new BaseCondition<FilterDTO>();
     }

  ngOnInit() {
    // this.loadFilterOptions();
    this.getLinkExportExcel();
    this.loadAll();
  }
  
  loadPages(page : number) {
    this.showSpinner("paging", "ball-spin-clockwise", "0.2");
    var condi : BaseCondition<FilterDTO> = new BaseCondition<FilterDTO>();
    condi.PageIndex = page;
    this.service.GetDataStatisticsPagingWithSearchResults(condi).subscribe((data : any) => {
      this.thongKes = data.itemList;
      this.page = page;
      this.totalRecords = data.totalRows;
      },(error) => {
        setTimeout(() => {
          alert("Lỗi: " + JSON.stringify(error));
          this.hideSpinner("paging");
        }, 5000);
    }, () => {
      this.hideSpinner("paging");
    });
  }

  loadAll(){
    this.showSpinner("dataTable", "timer", "0.8");
    this.service.GetDataStatisticsPagingWithSearchResults().subscribe((data : any) => {
      this.thongKes = data.itemList;
      this.pageSize = 5;
      this.page = 1;
      this.totalRecords = data.totalRows;
    }, (error) => {
      setTimeout(() => {
        alert("Lỗi: " + JSON.stringify(error));
        this.hideSpinner("dataTable");
      }, 5000);
    }, () => {
      this.hideSpinner("dataTable");
    });
  }

  getLinkExportExcel() {
    this.link = ApiUrl.apiUrl + 'Export/ExportExcel';
  }
  showSpinner (name?: string, type?: string, opacity? : string) {
    this.spinner.show(
      name,
      {
        type: `${type}`,
        size: 'small',
        bdColor: `rgba(255,255,255, ${opacity})`,
        color: 'rgb(0,191,255)',
        fullScreen: false
      }
    );
  }

  hideSpinner (name? : string) {
    setTimeout(() => {
      this.spinner.hide(name);
    }, 100);
  }

  ngOnDestroy(): void {
  
  }
}
