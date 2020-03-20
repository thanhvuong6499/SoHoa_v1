import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuanLyPhongPopupService } from '../quan-ly-phong-popup.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Phong, phongs } from '../../../model/phong.model';
import { QuanLyPhongService } from '../quan-ly-phong.service';
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
            if (result.isSuccess) {
              this.clear();
              this.onSaveSuccess("Chỉnh sửa thành công");
            }
            else {
              this.onSaveError("Chỉnh sửa thất bại, vui lòng thử lại.");
            }
          },
          (error)=> {
            // this.onSaveError();
            this.onSaveError("Chỉnh sửa thất bại, vui lòng thử lại.");
          },
          () => {
            this.onClose();
          });
      }
      else {
          this.service.insertNewPhong(this.phong)
          .subscribe((result) => {
            if (result.isSuccess) {
              this.toastr.success("Thêm mới thành công");
              this.clear();
              this.onClose();
            }
            else {
              this.onSaveError("Thêm mới thất bại, vui lòng thử lại");
            }
          },
          (error) => {
            this.onSaveError("Thêm mới thất bại, vui lòng thử lại");
          }, () => {
            // this.activeModal.dismiss("Create new successfully");
          });
      }
    }
    this.onClose();
  }
  onSaveSuccess(message: string) {
    this.toastr.success(message);
  }

  onSaveError(message: string){
    this.toastr.error(message);
  }

  onClose(){
    this.service.filter('Register click');
  }
  deleteFont(event) {
  }
  ngOnDestroy(): void {
  }

}

