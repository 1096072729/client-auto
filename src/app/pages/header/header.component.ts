import { Component, OnInit } from '@angular/core';
import { User, userOne } from 'src/app/entitys/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
user: User=userOne;
  constructor() { }

  ngOnInit(): void {
  }


  cancellation(){
    
  }

}
