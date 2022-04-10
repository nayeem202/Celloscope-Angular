import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from '../Service/storage.service';
import { LoginService } from '../Service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']

})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;
  submitted = false;
  //private loginService: LoginService,

  constructor(private fb: FormBuilder, private route: Router, private loginService: LoginService, private storageService: StorageService) { 
    this.formGroup = this.fb.group(
      {
        username: ['', [Validators.required]],
        password: ['', [Validators.required]]
      }
    )

  }




  ngOnInit(): void {
  }


  onSubmit(){
    
    this.submitted = true;
   this.loginService.login(this.formGroup.value)
   .subscribe(res => {
    //this.st = this.storageService.saveLoginInfo(res.data);
    this.route.navigate(['/admin']);
    //this.toastr.success("Successfully Login")
   }, err => {
    //this.toastr.error("Opps ! Login Failed")
     console.log(err);
     this.route.navigate(['/']);
   })
  }



}
