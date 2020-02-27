import { Component, OnInit, OnDestroy } from '@angular/core';
import { CoQuan, coquans } from '../../../model/co-quan.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { QuanLyCoQuanPopupService } from '../quan-ly-co-quan-popup.service';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { QuanLyCoQuanService } from '../quan-ly-co-quan-service.service';
import { Select2Data } from 'ng-select2-component';
import { QuanLyCoQuanComponent } from '../quan-ly-co-quan.component';
import { Router } from '@angular/router';
import { OrganType } from '../../../model/organ-type.model';
import { Select2OptionData } from 'ng-select2';
import { Options } from 'select2';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-co-quan-dialog',
  templateUrl: './co-quan-dialog.component.html',
  styleUrls: ['./co-quan-dialog.component.css']
})

export class CoQuanDialogComponent implements OnInit, OnDestroy {

  coQuan : CoQuan = new CoQuan();
  value1 = 'Default';
  isEdit : boolean = false;
  defaultValue : string;
  data: any;
  provinceId: number;
  districtId: number;
//  organTypeList: Select2Data;

  organTypeList: Array<Select2OptionData>;
  options: Options;
  provinceList: Array<Select2OptionData>;

  enaDistrict: boolean = true;
  districtList: Array<Select2OptionData>;

  enaWard: boolean = true;
  wardList: Array<Select2OptionData>;


  constructor(
    public activeModal: NgbActiveModal,
    public coQuanPopupService: QuanLyCoQuanPopupService,
    public service: QuanLyCoQuanService,
    private toastr: ToastrService,
    private router: Router,
  ) {
    //  this.organTypeList = new Array<OrganType>();
    this.options = {
      multiple: false,
      theme: 'classic',
      closeOnSelect: true,
      width: "100%"
    }
   }

  ngOnInit() {
    
    this.isEdit = false;
    this.service.getListOrganType()
      .subscribe((result) => {
        if (result != undefined) {
          var lstOrganType = [];
          for (var item of result) {
            var temp = { id: item.organTypeID, text: item.organTypeName };
            lstOrganType.push(temp);
          }
          this.organTypeList = lstOrganType;
        }
      },
      (error) => {
        console.log(error);
      }, () => {
      });
    
    this.service.getListProvince()
      .subscribe((result) => {
        var lstProvinces = [];
        for (const item of result) {
          var temp = { id: item.provincialID, text: item.provincialName }
          lstProvinces.push(temp);
        }
        this.provinceList = lstProvinces;
      },
      (error) => {
        console.log(error);
        setTimeout(() => {
          alert("Lấy dữ liệu về tỉnh/thành phố thất bại. Lỗi: " + JSON.stringify(error));
        }, 1000);
      },
      () => {
        
      });

    // edit
    if(this.coQuanPopupService.result.item != undefined) {
      this.coQuan = this.coQuanPopupService.result.item;
      this.provinceId = this.coQuan.tinhID;
      this.districtId = this.coQuan.huyenID;
      this.isEdit = true
      this.enaDistrict = false;
      this.enaWard = false;
    }

  }
  update1(value: string) {

  }
  clear() {
    this.activeModal.dismiss('cancel');
  }

  save() {
    if (this.isEdit) {
      console.log(this.coQuan);
      this.service.updateCoQuan(this.coQuan)
        .subscribe((result) => {
          console.log(result);
        },
        (error)=> {
          console.log(error);
          
          // this.onSaveError();
        },
        () => {
          // do something
          this.activeModal.dismiss("Update successfully.");
          this.onSaveSuccess("Chỉnh sửa thành công");

        });
    }
    else {
        this.service.insertNewCoQuan(this.coQuan)
        .subscribe((result) => {
          console.log(result);
        },
        (error) => {
          console.log(error);
        }, () => {
          this.onSaveSuccess("Thêm mới thành công");
          this.activeModal.dismiss("Create new successfully");
        });
    }
  }

  getDistrictByProvinceId(value : any) {
    if (value != null) {
      this.service.getDistrictByProvinceId(value)
      .subscribe((districs) => {
        if (districs != undefined) {
            var lstDistricts = [];
            for (const item of districs) {
              var temp = { id: item.districtID, text: item.districtName }
              lstDistricts.push(temp);
            }
            this.districtList = lstDistricts;
            this.enaWard = true;
        }
      },
      (error) => {
        alert("Lấy dữ liệu danh sách huyện thất bại. Lỗi: " + JSON.stringify(error));
      },
      () => {
        this.enaDistrict = false;
      });
      
    }
  }

  getWardByDistrictId(value : any) {
    if (value != null) {
        if (this.districtId != undefined) {
          if (this.coQuan.tinhID != this.provinceId && value == this.districtId) {
            this.getWardByProvinceId(this.coQuan.tinhID);
          }
          else {
            this.getWardByDistrictIdSer(value);
          }
        }
        else {
          //
          this.getWardByDistrictIdSer(value);
        }
        
    }
    else {
      this.getWardByProvinceId(this.coQuan.tinhID);
    }
  }

  getWardByProvinceId(id: number) {
    this.service.getWardByProvinceId(id)
            .subscribe((wards) => {
              if (wards != undefined) {
                var lstWards = [];
                for (const item of wards) {
                  var temp = { id: item.wardsID, text: item.wardsName };
                  lstWards.push(temp);
                }
                this.wardList = lstWards;
              }
          }, (error) => {
            alert("Lấy dữ liệu danh sách xã thất bại. Lỗi: " + JSON.stringify(error));
          },
          () => {
            this.enaWard = false;
          });
  }

  getWardByDistrictIdSer(id : number) {
    this.service.getWardByDistrictId(id.toString())
            .subscribe((wards) => {
                if (wards != undefined) {
                  var lstWards = [];
                  for (const item of wards) {
                    var temp = { id: item.wardsID, text: item.wardsName };
                    lstWards.push(temp);
                  }
                  this.wardList = lstWards;
                }
            }, (error) => {
              alert("Lấy dữ liệu danh sách xã thất bại. Lỗi: " + JSON.stringify(error));
            },
            () => {
              this.enaWard = false;
            });
  }
 

  onSaveSuccess(message: string) {
    this.toastr.success(message);
  }
  onSaveError(message){
    this.toastr.success(message);
  }
  ngOnDestroy(): void {
    
  }
}
