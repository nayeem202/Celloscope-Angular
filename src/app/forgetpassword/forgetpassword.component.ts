import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../Service/login.service';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent implements OnInit {

  formGroup: FormGroup;
  submitted = false;


  constructor(private fb: FormBuilder, private route: Router, private loginService: LoginService,  private toastr: ToastrService) {
    this.formGroup = this.fb.group(
      {
        userId: ['', [Validators.required]],
        mobile: ['', [Validators.required]],
        password:[]
      }
    )

  }




  ngOnInit(): void {
    
  }
  get f() {
    return this.formGroup.controls;
  }

  st: any;

  onSubmitforget() {

    this.submitted = true;
    if (this.formGroup.valid) {

      this.loginService.resetPassword(this.formGroup.value)
        .subscribe(res => {
          this.route.navigate(['/forget']);
          this.toastr.success("Your Information Is Matched.")
          this.loginService.updatePassword(this.formGroup.value).subscribe(res => {
            this.toastr.success("Password successfully updated")
          })
          
        }, err => {
          this.toastr.error("Information Doesn't Match. Try Again")
          console.log(err);
          this.route.navigate(['/forget']);
        })
    }

}
}