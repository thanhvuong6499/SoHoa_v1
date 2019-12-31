import { Injectable, Component } from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { DanhMuc, danhmucs } from '../../model/danh-muc.model';

@Injectable({
  providedIn: 'root'
})
export class QuanLyDanhMucPopupService {
  private ngbModalRef: NgbModalRef;
  private id : number;
  constructor(
      private modalService: NgbModal,
      private router: Router,

  ) {
      this.ngbModalRef = null;
  }
  private danhmucs : DanhMuc[];
  public open(component: Component, id?: number | any): Promise<NgbModalRef> {
      return new Promise<NgbModalRef>((resolve, reject) => {
          const isOpen = this.ngbModalRef !== null;
          if (isOpen) {
              resolve(this.ngbModalRef);
          }

          if (id) {
              // this.batHoService.find(id)
              //     .subscribe((batHoResponse: HttpResponse<BatHo>) => {
              //         const batHo: BatHo = batHoResponse.body;
              //         this.ngbModalRef = this.batHoModalRef(component, batHo);
              //         resolve(this.ngbModalRef);
              //     });
              this.id = id;
              
              this.ngbModalRef = this.danhMucModalRef(component, this.getDanhMucById());
              resolve(this.ngbModalRef);
              console.log(this.getDanhMucById());
              
          } else {
              this.id = null;
              // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
              setTimeout(() => {
                  this.ngbModalRef = this.danhMucModalRef(component, new DanhMuc());
                  resolve(this.ngbModalRef);
              }, 0);
              console.log("aloalo");
          }
      });
  }
  public getDanhMucById(){
      this.danhmucs = danhmucs;
              var danhmuc = new DanhMuc();
              for (let i = 0; i < danhmucs.length; i ++) {
                  if (this.id == danhmucs[i].id){
                      danhmuc = danhmucs[i];
                  }
                  
              }
              return danhmuc;
  };
 public danhMucModalRef(component: Component, danhmuc: DanhMuc): NgbModalRef {
      const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
      //// Go back to home page after the modal is closed
      // modalRef.result.then((result) => {
      //     this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
      //     this.ngbModalRef = null;
      // }, (reason) => {
      //     this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
      //     this.ngbModalRef = null;
      // });
      // console.log(modalRef)
      return modalRef;
  }
}
