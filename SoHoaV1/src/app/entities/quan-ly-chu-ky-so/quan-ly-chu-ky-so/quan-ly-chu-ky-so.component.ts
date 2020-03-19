import { Component, OnInit } from '@angular/core';
import { BaseCondition } from '../../../common/BaseCondition';
import { Options } from 'select2';
import { Select2OptionData } from 'ng-select2';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-quan-ly-chu-ky-so',
  templateUrl: './quan-ly-chu-ky-so.component.html',
  styleUrls: ['./quan-ly-chu-ky-so.component.css']
})
export class QuanLyChuKySoComponent implements OnInit {
  imgSrc: string | ArrayBuffer;
  options: Options;
  organNameArr: Array<Select2OptionData>;
  page = 1;
  pageSize = 5;
  form: FormGroup;
  submitted = false;
  loading = false;
  errorMessageFileUpload: string = '';

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.organNameArr = new Array<Select2OptionData>();
    this.options = {
      width: "100%",
      closeOnSelect: true,
      multiple: false,
      tags: false,
      theme: 'classic'
    }
    this.form = this.formBuilder.group({
      organName: ['', Validators.required],
      file: [undefined, Validators.required]
    });
  }
  onFileSelected() {
    var sr
    let $img: any = document.querySelector('#file');
    if (typeof (FileReader) !== 'undefined') {
      let reader = new FileReader();
      reader.readAsDataURL($img.files[0]);
      console.log($img.files[0].type);
      var fileExtension = $img.files[0].type.toString().split('/')[1];
      if (fileExtension !== 'png') {
        $('#file').val('');
        this.errorMessageFileUpload = "Chỉ chấp nhận định dạng .png, vui lòng thử lại.";
        return;
      }
      reader.onload = (e: any) => {
        var image = new Image();
        image.src = e.target.result;
        image.onload = function() {
          if (image.height == 200 && image.width == 200) {
            $('#file').attr('src', e.target.result);
          }
          else {
            $('#file').val('');
            $(document).find('#image-upload .error').html('Chỉ được upload file có kích thước tiêu chuẩn 200x200 (px), vui lòng thử lại.');
            return;
          }
        };
      };
    }  
  }

  get f() {
    return this.form.controls;
  }

  onSubmit(event) {
    console.log(event);
    this.submitted = true;
    console.log(this.f);
    if (this.form.invalid) { return; }

    this.loading = true;


  }
}
