import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../Service/login.service';
import { StorageService } from '../Service/storage.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  formGroup: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private route: Router, private loginService: LoginService, private storageService: StorageService, private toastr: ToastrService) {
    this.formGroup = this.fb.group(
      {
        userId: ['', [Validators.required]],
        password: ['', [Validators.required]],
        mobile: ['', [Validators.required]],

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

  st: any;

  onSubmitReg() {

    this.submitted = true;
    if (this.formGroup.valid){
      this.loginService.signup(this.formGroup.value)
      .subscribe(res => {
        this.route.navigate(['/signup']);
        this.toastr.success("Successfully Registered")
      }, err => {
        if(err.status==403){
          this.toastr.error("User Already Exists")
          this.route.navigate(['/signup']);
        }else
        {
          this.toastr.error("Registered Failed")
          this.route.navigate(['/signup']);
        }
        console.log(err);
        this.route.navigate(['/signup']);
      })
  }

    }

  

}