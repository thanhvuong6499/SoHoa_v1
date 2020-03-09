import { Injectable, Component } from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { User } from '../../model/user.model';
@Injectable({
  providedIn: 'root'
})
export class QuanLyNguoiDungPopupService {
  private ngbModalRef: NgbModalRef;
  private id : number;
  private user: User;
  constructor(
      private modalService: NgbModal,
      private router: Router,

  ) {
      this.ngbModalRef = null;
      this.user = new User();
  }

  public open(component: Component, id?: number | any): Promise<NgbModalRef> {
      return new Promise<NgbModalRef>((resolve, reject) => {
          const isOpen = this.ngbModalRef !== null;
          if (isOpen) {
              resolve(this.ngbModalRef);
          }
          if (id) {
              this.id = id;
              this.user.Id = id;
              this.ngbModalRef = this.UserModalRef(component, this.user);
              resolve(this.ngbModalRef);
          } else {
              this.id = null;
              // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
              setTimeout(() => {
                  this.ngbModalRef = this.UserModalRef(component, new User());
                  resolve(this.ngbModalRef);
              }, 0);
          }
      });
  }

 public UserModalRef(component: Component, user: User): NgbModalRef {
      const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
      return modalRef;
  }
}
