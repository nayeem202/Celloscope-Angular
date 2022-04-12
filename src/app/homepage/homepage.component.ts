import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../Service/storage.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private storageService : StorageService, private route: Router) { }

  ngOnInit(): void {
  }

  logout(){
    this.storageService.logout();
    this.route.navigateByUrl("/");
  }



}
