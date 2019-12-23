import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-them-moi-phong',
  templateUrl: './them-moi-phong.component.html',
  styleUrls: ['./them-moi-phong.component.css']
})
export class ThemMoiPhongComponent implements OnInit {
  @ViewChild("createNewPhong") public createNewPhong : ModalDirective;
  @Input() actionType : string;
  @Input() iconClass : string;
  @Input() btnClass: string;
  @Input() data : string[];
  constructor() { }

  ngOnInit() {
    console.log(this.data);
  }

  onSubmit(event) {
    console.log(event);
    return false;
  }
}
