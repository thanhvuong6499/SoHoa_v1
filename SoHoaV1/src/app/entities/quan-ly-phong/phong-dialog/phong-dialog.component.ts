import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuanLyPhongPopupService } from '../quan-ly-phong-popup.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { phongPopupRoute } from '../quan-ly-phong-routing.module';
import { Phong, phongs } from '../../../model/phong.model';
import { isDaylightSavingTime } from 'ngx-bootstrap/chronos/units/offset';
import { CoQuan, coquans } from '../../../model/co-quan.model';
import { QuanLyPhongService } from '../quan-ly-phong.service';
import { Subscription } from 'rxjs';
import { Select2Data } from 'ng-select2-component';
import { Select2OptionData } from 'ng-select2';
import { Options } from 'select2';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-phong-dialog',
  templateUrl: './phong-dialog.component.html',
  styleUrls: ['./phong-dialog.component.css']
})
export class PhongDialogComponent implements OnInit, OnDestroy {
  phong = new Phong();
  isEdit: boolean = false;
  defaultValue : string;
  data: any;
  lstOrgan: Array<Select2OptionData>;
  options: Options;

  private subscription: Subscription;
  private eventSubscriber: Subscription;
  constructor(
    public activeModal: NgbActiveModal,
    public phongPopupService: QuanLyPhongPopupService,
    public service: QuanLyPhongService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute)
    {
      this.phong = new Phong();
      this.options = {
        multiple: false,
        theme: 'classic',
        closeOnSelect: true,
        width: "100%"
      }
    }

  ngOnInit() {
    this.isEdit = false;
    this.service.getAllCoQuan()
      .subscribe((result) => {
        if (result != undefined) {
          var organs = [];
          for (var item of result.itemList) {
            var temp = { id: item.organID, text: item.tenCoQuan };
            organs.push(temp);
          }
          this.lstOrgan = organs;
        }
      },
      (error) => {
      }, () => {
      });
      if(this.phongPopupService.result.item != undefined){
        this.phong = this.phongPopupService.result.item;
        this.isEdit = true;
      }
  }
  clear() {
    this.activeModal.dismiss('cancel');
  }
  save() {
    if(this.phong.organID == undefined || this.phong.organID == null || this.phong.organID==0){
      this.onSaveError("Chọn cơ quan lữu trữ!!!");
    }
    else{
      if (this.isEdit) {
        this.service.updatePhong(this.phong)
          .subscribe((result) => {
          },
          (error)=> {
            this.activeModal.dismiss("Update failure.");
            this.onSaveError("Chỉnh sửa thất bại");
          },
          () => {
            // do something
            this.activeModal.dismiss("Update successfully.");
            this.onSaveSuccess("Chỉnh sửa thành công");
  
          });
      }
      else {
          this.service.insertNewPhong(this.phong)
          .subscribe((result) => {
          },
          (error) => {
            this.onSaveError("Thêm mới thất bại");
            this.activeModal.dismiss("Create new failure");
          }, () => {
            this.onSaveSuccess("Thêm mới thành công");
            this.activeModal.dismiss("Create new successfully");
          });
      }
    }
  }
  onSaveSuccess(message: string){
    this.toastr.success(message);
  }
  onSaveError(message){
    this.toastr.success(message);
  }
  deleteFont(event) {
  }
  ngOnDestroy(): void {
  }

}

