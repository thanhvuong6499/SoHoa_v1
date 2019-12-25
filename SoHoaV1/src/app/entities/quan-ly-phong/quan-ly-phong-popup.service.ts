import { Injectable, Component } from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Phong, phongs } from '../../model/phong.model';

@Injectable()
export class QuanLyPhongPopupService {
    private ngbModalRef: NgbModalRef;
    private id : number;
    constructor(
        private modalService: NgbModal,
        private router: Router,

    ) {
        this.ngbModalRef = null;
    }
    private phongs : Phong[];
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
                
                this.ngbModalRef = this.phongModalRef(component, this.getPhongById());
                resolve(this.ngbModalRef);
                console.log(this.getPhongById());
                
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.phongModalRef(component, new Phong());
                    resolve(this.ngbModalRef);
                }, 0);
                console.log("aloalo");
            }
        });
    }
    public getPhongById(){
        this.phongs = phongs;
                var phong = new Phong();
                for (let i = 0; i < phongs.length; i ++) {
                    if (this.id == phongs[i].id){
                        phong = phongs[i];
                    }
                    
                }
                return phong;
    };
   public phongModalRef(component: Component, phong: Phong): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        console.log(modalRef)
        return modalRef;
    }
}
