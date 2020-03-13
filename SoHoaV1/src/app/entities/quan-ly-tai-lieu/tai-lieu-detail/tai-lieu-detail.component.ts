import { Component, OnInit } from '@angular/core';
import { Document } from '../../../model/document.model';
import { Subscription } from 'rxjs';
import { QuanLyTaiLieuService } from '../quan-ly-tai-lieu.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-tai-lieu-detail',
  templateUrl: './tai-lieu-detail.component.html',
  styleUrls: ['./tai-lieu-detail.component.css']
})
export class TaiLieuDetailComponent implements OnInit {
  document: Document;
  page = 1;
  private subscription: Subscription;
  private eventSubscriber: Subscription;
  constructor(
    private quanLyTaiLieuService: QuanLyTaiLieuService,
    private route: ActivatedRoute,
  ) {
    this.document = new Document();
   }

  ngOnInit() {
    this.subscription = this.route.params.subscribe((params) => {
      this.load(params['id']);
    });
  }
  load(id : number) {
      this.quanLyTaiLieuService.getDocumentById(id)
        .subscribe((result) => {
          this.document = result.item;
          
        });
    }
    ngOnDestroy(): void {
        this.subscription.unsubscribe();
      }
}
