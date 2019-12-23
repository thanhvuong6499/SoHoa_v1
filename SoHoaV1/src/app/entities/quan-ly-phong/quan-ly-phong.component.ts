import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ModalDirective, BsModalRef } from 'ngx-bootstrap';
import {NgbModalRef} from '@ng-bootstrap/ng-bootstrap'
@Component({
  selector: 'app-quan-ly-phong',
  templateUrl: './quan-ly-phong.component.html',
  styleUrls: ['./quan-ly-phong.component.css']
})
export class QuanLyPhongComponent implements OnInit {
<<<<<<< HEAD
=======
  @ViewChild("modalPhong") public modalPhong : ModalDirective;
>>>>>>> origin/TuND

  constructor(
    
  ) { }

  ngOnInit() {
    
  }

}
