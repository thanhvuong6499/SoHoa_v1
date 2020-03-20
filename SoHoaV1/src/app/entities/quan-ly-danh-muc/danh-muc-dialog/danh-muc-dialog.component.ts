import { Component, OnInit } from '@angular/core';
import { DanhMuc, danhmucs } from '../../../model/danh-muc.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { QuanLyDanhMucPopupService } from '../quan-ly-danh-muc-popup.service';
import { QuanLyDanhMucService } from '../quan-ly-danh-muc.service';
import { Phong, phongs } from '../../../model/phong.model';
import { Select2OptionData } from 'ng-select2';
import { Subscription } from 'rxjs';
import { Options } from 'select2';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-danh-muc-dialog',
  templateUrl: './danh-muc-dialog.component.html',
  styleUrls: ['./danh-muc-dialog.component.css']
})
export class DanhMucDialogComponent implements OnInit {
  danhmuc: DanhMuc;
  phongs: Phong[];
  isEdit: boolean = false;
  defaultValue : string;
  data: any;
  lstOrgan: Array<Select2OptionData>;
  lstFont: Array<Select2OptionData>;
  options: Options;
  optionsOrgan :Options;
  
  private subscription: Subscription;
  private eventSubscriber: Subscription;
  constructor(
    private danhMucPopupService: QuanLyDanhMucPopupService,public activeModal: NgbActiveModal,
    public service: QuanLyDanhMucService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute)
    {
      this.danhmuc = new DanhMuc();
      this.options = {
        multiple: false,
        theme: 'classic',
        closeOnSelect: true,
        width: "100%"
      }
    }

  ngOnInit() {
    this.isEdit = false;
    this.service.getAllPhong()
      .subscribe((result) => {
        if (result != undefined) {
          var phongs = [];
          for (var item of result.itemList) {
            var temp = { id: item.fontID, text: item.fontName };
            phongs.push(temp);
          }
          this.lstFont = phongs;
        }
      },
      (error) => {
      }, () => {
      });
      if(this.danhMucPopupService.result.item != undefined){
        this.danhmuc = this.danhMucPopupService.result.item;
        this.isEdit = true;
      }
  }
  clear() {
    this.activeModal.dismiss('cancel');
  }
  save() {
    if(this.danhmuc.fontID == undefined || this.danhmuc.fontID == null || this.danhmuc.fontID==0){
      this.onSaveError("Chọn phông lữu trữ!!!");
    }else{
      if (this.isEdit) {
        this.service.updateDanhMuc(this.danhmuc)
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
          this.service.insertNewDanhMuc(this.danhmuc)
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
