import { Injectable, Component } from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Phong } from '../../model/phong.model';

@Injectable()
export class QuanLyPhongPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
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
                const phong = new Phong();
                this.ngbModalRef = this.phongModalRef(component,phong);
                resolve(this.ngbModalRef);
                console.log("aloalo");
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

    phongModalRef(component: Component, phong: Phong): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
