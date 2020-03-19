import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { FormBuilder, FormGroup, FormControl, Validators, CheckboxRequiredValidator } from '@angular/forms';
import { Observable } from 'rxjs';
import {startWith, map} from 'rxjs/operators';
import { AuthenticationService } from '../../../services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { BaseCondition } from '../../../common';
import { LoaiHoSo } from '../../../model/loai-ho-so';
import { LoaiHoSoService } from '../loai-ho-so.service';
import { QuanLyLoaiHoSoPopupService } from '../quan-ly-loai-ho-so-popup.service';
@Component({
  selector: 'app-loai-ho-so-dialog',
  templateUrl: './loai-ho-so-dialog.component.html',
  styleUrls: ['./loai-ho-so-dialog.component.css']
})
export class LoaiHoSoDialogComponent  implements OnInit, OnDestroy{

  loaiHoSo: LoaiHoSo = new LoaiHoSo();
  page = 1;
  condition: BaseCondition<LoaiHoSo> = new BaseCondition<LoaiHoSo>();
  pageSize: number;
  totalRecords: number;
  loaiHoSos: LoaiHoSo[];
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three', 'fdsfsfd', 'fdsfsf', 'fdsfsdf'];
  filteredOptions: Observable<string[]>;
  create: boolean = false;
  edit: boolean = false;
  formGroup: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private _formBuilder: FormBuilder,
    private service: LoaiHoSoService,
    private authenticationService: AuthenticationService,
    public popupService: QuanLyLoaiHoSoPopupService,
    private toast: ToastrService,
  ) {
      
   }

  ngOnInit() {
      this.edit = false;
      if(this.popupService.result.item != undefined){
        this.loaiHoSo = this.popupService.result.item;
        this.edit = true;
      }
  }

  public get f() {
    return this.formGroup.value;
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  clear() {
    this.activeModal.dismiss('cancel');
  }
  save() {
    if (this.edit) {
      this.service.updateLoaiHoSo(this.loaiHoSo)
        .subscribe((result) => {
        },
        (error)=> {
          
          // this.onSaveError();
        },
        () => {
          // do something
          // this.activeModal.dismiss("Update successfully.");
          this.onSaveSuccess("Chỉnh sửa thành công");

        });
    }
    else {
        this.service.insertNewLoaiHoSo(this.loaiHoSo)
        .subscribe((result) => {
        },
        (error) => {
        }, () => {
          this.onSaveSuccess("Thêm mới thành công");
          // this.activeModal.dismiss("Create new successfully");
        });
    }
    this.onClose();
  }

  onChangeCreateRole(value: boolean) {
    // this.userGroup.userrole.create = value;
    if (value == true) {
      this.edit = true;
    }
    else {
      this.edit = false;
    }
  }

  onChangeEditRole(value : boolean) {
    // this.user.userrole.edit = value;
    if(value == true) {
      this.create = true;
    }
    else {
      this.create = false;
    }
  }
  onSaveSuccess(message: string) {
    this.toast.success(message);
  }

  onSaveError(message){
    this.toast.success(message);
  }

  onClose(){
    this.service.filter('Register click');
    this.activeModal.close();
  }
  ngOnDestroy(): void {
  }
}
