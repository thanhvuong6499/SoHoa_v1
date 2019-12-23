import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-them-moi-phong',
  templateUrl: './them-moi-phong.component.html',
  styleUrls: ['./them-moi-phong.component.css']
})
export class ThemMoiPhongComponent implements OnInit {
  @Input() @ViewChild("createNewPhong") public createNewPhong : ModalDirective;
  constructor() { }

  ngOnInit() {
    
  }
}
