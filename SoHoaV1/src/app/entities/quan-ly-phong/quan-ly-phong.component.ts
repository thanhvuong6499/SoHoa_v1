import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ModalDirective, BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-quan-ly-phong',
  templateUrl: './quan-ly-phong.component.html',
  styleUrls: ['./quan-ly-phong.component.css']
})
export class QuanLyPhongComponent implements OnInit {
  @ViewChild("modalPhong") public modalPhong : ModalDirective;

  constructor(
    
  ) { }

  ngOnInit() {
    
  }

}
