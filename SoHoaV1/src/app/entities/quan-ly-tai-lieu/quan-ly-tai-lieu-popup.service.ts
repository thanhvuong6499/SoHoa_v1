import { Injectable, Component } from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { VanBan, vanbans } from '../../model/van-ban.model';

@Injectable({
  providedIn: 'root'
})
export class QuanLyTaiLieuPopupService {

  private ngbModalRef: NgbModalRef;
  private id : number;
  constructor(
      private modalService: NgbModal,
      private router: Router,

  ) {
      this.ngbModalRef = null;
  }
  private vanbans : VanBan[];
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
              
              this.ngbModalRef = this.vanBanModalRef(component, this.getVanBanById());
              resolve(this.ngbModalRef);
              console.log(this.getVanBanById());
              
          } else {
              this.id = null;
              // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
              setTimeout(() => {
                  this.ngbModalRef = this.vanBanModalRef(component, new VanBan());
                  resolve(this.ngbModalRef);
              }, 0);
              console.log("aloalo");
          }
      });
  }
  public getVanBanById(){
      this.vanbans = vanbans;
              var vanban = new VanBan();
              for (let i = 0; i < vanbans.length; i ++) {
                  if (this.id == vanbans[i].id){
                      vanban = vanbans[i];
                  }
                  
              }
              return vanban;
  };
 public vanBanModalRef(component: Component, vanban: VanBan): NgbModalRef {
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
