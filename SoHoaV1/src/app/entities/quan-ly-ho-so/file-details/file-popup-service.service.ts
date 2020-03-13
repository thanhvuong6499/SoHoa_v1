import { Injectable, Component } from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { FileDetailsComponent } from './file-details.component';

@Injectable({
  providedIn: 'root'
})
export class FilePopupService {
  private ngbModalRef: NgbModalRef;
  private id : number;
  constructor(
    private modalService: NgbModal,
    private router: Router
  ) { this.ngbModalRef = null; }

  public open(component: Component, id?: number | any): Promise<NgbModalRef> {
    return new Promise<NgbModalRef>((resolve, reject) => {
        const isOpen = this.ngbModalRef !== null;
        if (isOpen) {
            resolve(this.ngbModalRef);
        }
        if (id) {
              // lấy thông tin danh sách file của hồ sơ
        } else {
            //  this.profile = undefined;
            // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
            setTimeout(() => {
                this.ngbModalRef = this.fileModalRef(component, new FileDetailsComponent());
                resolve(this.ngbModalRef);
            }, 0);
        }
    });
  }

  public fileModalRef(component: Component, files: FileDetailsComponent): NgbModalRef {
      const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static', windowClass:'animated slideInUp'});
      return modalRef;
  }
}
