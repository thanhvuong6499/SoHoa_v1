import { Injectable, Component } from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { CoQuan, coquans } from '../../model/co-quan.model';

@Injectable()
export class QuanLyCoQuanPopupService {
  private ngbModalRef: NgbModalRef;
  private id : number;
  constructor(
      private modalService: NgbModal,
      private router: Router,

  ) {
      this.ngbModalRef = null;
  }
  private coquans : CoQuan[];
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
              
              this.ngbModalRef = this.coQuanModalRef(component, this.getCoQuanById());
              resolve(this.ngbModalRef);
              console.log(this.getCoQuanById());
              
          } else {
              this.id = null;
              // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
              setTimeout(() => {
                  this.ngbModalRef = this.coQuanModalRef(component, new CoQuan());
                  resolve(this.ngbModalRef);
              }, 0);
              console.log("aloalo");
          }
      });
  }
  public getCoQuanById(){
      this.coquans = coquans;
              var coquan = new CoQuan();
              for (let i = 0; i < coquans.length; i ++) {
                  if (this.id == coquans[i].id){
                      coquan = coquans[i];
                  }
                  
              }
              return coquan;
  };
 public coQuanModalRef(component: Component, coquan: CoQuan): NgbModalRef {
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
