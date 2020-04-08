import { Component, OnInit } from '@angular/core';
import { BaseCondition } from '../../../common';
import { LogActivity } from '../../../model/log-activity';
import { ActivatedRoute } from '@angular/router';
import { ThongKeService } from '../thong-ke.service';
import { UserService } from '../../quan-ly-nguoi-dung/user.service';
import { UserDTO } from '../../../model/user.model';
import { Options } from 'select2';
import { Select2OptionData } from 'ng-select2';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-nhat-ky',
  templateUrl: './nhat-ky.component.html',
  styleUrls: ['./nhat-ky.component.css']
})
export class NhatKyComponent implements OnInit {
  logActivitys: LogActivity[];
  logActivity: LogActivity;
  users: UserDTO[];
  searchText: string = "";
  page = 1;
  previousPage : number;
  pageSize : number;
  totalRecords : number;
  condition: BaseCondition<LogActivity>;
  options: Options;
  userArr: Array<Select2OptionData>;
  arrayUserValue: string[];

  constructor( 
    private route: ActivatedRoute,
    private service: ThongKeService,
    private userService: UserService,
    private spinner: NgxSpinnerService,
    ) 
    {
      this.condition = new BaseCondition<LogActivity>();
      this.userArr = new Array<Select2OptionData>();
      this.options = {
        width: "100%",
        closeOnSelect: true,
        multiple: true,
        tags: true
      }
     }

  ngOnInit() {
    this.loadFilterOptions();
    this.loadAll();
  }
  
  loadPages(page : number) {
    this.showSpinner("paging", "ball-spin-clockwise", "0.2");
    var condi : BaseCondition<LogActivity> = new BaseCondition<LogActivity>();
    condi.PageIndex = page;
    this.service.getAlllogActivityWithPaging(condi).subscribe((data : any) => {
      this.logActivitys = data.itemList;
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
    this.service.getAlllogActivityWithPaging().subscribe((data : any) => {
      this.logActivitys = data.itemList;
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

  loadFilterOptions () {
    this.userService.getAllUser()
    .subscribe((result) => {
    //  this.organFilterData = result;
      var arrTypes = [];
      for (const item of result.itemList) {
        let value = { id: item.userName, text: item.userName }
        arrTypes.push(value);
      }
      this.userArr = arrTypes;
    }, 
    (error => {
      setTimeout(() => {
        alert("Lỗi: " + JSON.stringify(error));
        // this.hideSpinner("filterOptions");
      }, 5000);
    }),
    () => {
      // this.hideSpinner("filterOptions");
    })
  }
  
  getFilterOptions (types: string[]) {
    this.condition.PageIndex = 1;
    this.condition.FilterRuleList = [
      {
        field: "us.UserName",
        op: "",
        value: ""
      }
    ]
    this.arrayUserValue = types;
    if (this.arrayUserValue != undefined) {
      this.condition.FilterRuleList[0].value = types.toString();
      if (types.length == 1) {
        this.condition.FilterRuleList[0].op = "and_contains";
      }
      else {
        this.condition.FilterRuleList[0].op = "and_in_strings";
      }
    }
    if (types != undefined) {
      this.showSpinner("paging", "ball-spin-clockwise", "0.2");
      this.service.getAlllogActivityWithPaging(this.condition)
      .subscribe((data: any) => {
        this.logActivitys = data.itemList;
        this.pageSize = 5;
        this.page = 1;
        this.totalRecords = data.totalRows;
      }, (error) => {
        setTimeout(() => {
          alert("Lỗi: " + JSON.stringify(error));
          this.hideSpinner("paging");
        }, 5000);
      }, () => {
        this.hideSpinner("paging");
      })
    }
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
