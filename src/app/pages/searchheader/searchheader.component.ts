import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Goods } from 'src/app/entitys/goods';

@Component({
  selector: 'app-searchheader',
  templateUrl: './searchheader.component.html',
  styleUrls: ['./searchheader.component.css']
})
export class SearchheaderComponent implements OnInit {
  @Output() public searchChange = new EventEmitter();
  searchlist:string[]=['微信','虚拟','软件','账号','充值卡']
  searchValue:string='';
  constructor() { }


  
  ngOnInit(): void {
   
  }

  search(){

      this.searchChange.emit(this.searchValue);
  
 
  }

  listsearch(i:number){
this.searchValue=this.searchlist[i]
this.search();
  }

  



}
