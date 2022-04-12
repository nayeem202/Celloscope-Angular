import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from '../Service/storage.service';
import { LoginService } from '../Service/login.service';
import { ToastrService } from 'ngx-toastr';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']

})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;
  submitted = false;


  constructor(private fb: FormBuilder, private route: Router, private loginService: LoginService, private storageService: StorageService, private toastr: ToastrService) {
    this.formGroup = this.fb.group(
      {
        userId: ['', [Validators.required]],
        password: ['', [Validators.required]]
      }
    )

  }




  ngOnInit(): void {
    var isLoggedIn = this.storageService.isLoggedIn();
    if (isLoggedIn) this.route.navigate(['/']);
  }
  get f() {
    return this.formGroup.controls;
  }

 

  onSubmit() {

    this.submitted = true;
    if (this.formGroup.valid) {

      this.loginService.login(this.formGroup.value)
        .subscribe(res => {
          this.storageService.saveLoginInfo(res.data);
          this.route.navigate(['/homepage']);
          this.toastr.success("Successfully Login")
        }, err => {
          this.toastr.error("Opps ! Login Failed")
          console.log(err);
          this.route.navigate(['/']);
        })
    }


  }




}