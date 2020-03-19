import { Injectable, Component } from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Phong, phongs } from '../../model/phong.model';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../../services/authentication.service';
import { BaseCondition, HttpUtilities, ApiUrl, ReturnResult, HttpHeadersOptions } from '../../common';
import { QuanLyPhongService } from './quan-ly-phong.service';

@Injectable()
export class QuanLyPhongPopupService {
    private ngbModalRef: NgbModalRef;
    private id : number;
    public result : ReturnResult<Phong>;
    phong: Phong;
    constructor(
        private modalService: NgbModal,
        private router: Router,
        private httpClient : HttpClient, 
        private authenticationService: AuthenticationService,
        private phongService: QuanLyPhongService
    ) {
        this.ngbModalRef = null;
        this.ngbModalRef = null;
        this.result = new ReturnResult<Phong>();
    }
    private phongs : Phong[];
    public open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.id = id;
                this.phongService.getPhongById(id)
                .subscribe((result) => {
                    this.result = result;
                    const phong : Phong = result.item;
                    
                }, (error) => {

                }, () => {
                    this.ngbModalRef = this.phongModalRef(component, new Phong());
                    resolve(this.ngbModalRef);
                });
            //    this.ngbModalRef = this.phongModalRef(component, this.phong);
            } else {
                this.result.item = undefined;
                setTimeout(() => {
                    this.ngbModalRef = this.phongModalRef(component, new Phong());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }
    public phongModalRef(component: Component, phong: Phong): NgbModalRef {
            const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
            return modalRef;
        }
}
