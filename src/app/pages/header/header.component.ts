import { Component, OnInit } from '@angular/core';
import { User, userOne } from 'src/app/entitys/user';
import { HttpService } from 'src/app/httpserver.service';
import { idInterface } from 'src/app/interfaces/id';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
user: User={};
  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
  }


  cancellation(){
    const id:idInterface={id: parseInt(localStorage.getItem('userid') as string) };
    if(!id){
      return;
    }

    this.httpService.signOut().subscribe(
      next => {

    }, 
    error=>{

    })

  }


  resignin(){

  }

}
