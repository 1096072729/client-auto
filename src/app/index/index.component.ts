import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
a='asd'
  constructor() { }

  ngOnInit(): void {
  }
  getgoodsList(e:any){
console.log(e)
  }


}
