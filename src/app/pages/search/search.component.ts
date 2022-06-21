import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, startWith, map } from 'rxjs';
import { Goods } from 'src/app/entitys/goods';
import { User } from 'src/app/entitys/user';
import { HttpService } from 'src/app/httpserver.service';
import { ActivatedRoute }from '@angular/router';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
page:number =1;
  goods: string[] = [];
  goodsNumber:number = 0;
  goodslist:Goods[]=[]
  searchValue:string = 'asd'
  constructor(private httpService: HttpService,
    private route: ActivatedRoute){
    
  }
  ngOnInit() {
    this.searchValue=this.route.snapshot.paramMap.get('searchValue') as string;
    this.getGoodsList()
  }
  ngafterViewInit() {
    this.searchValue=this.route.snapshot.paramMap.get('searchValue') as string;
    this.getGoodsList()
  }

  getGoodsList(){
    this.httpService.searchGoods(this.page-1,this.searchValue).subscribe({
      next:data => {
        console.log(data)
        this.goodsNumber=data.total
        console.log(data.total)
this.goodslist= data.data
      },
      error: error => {
        console.log(error);
        console.log('获取商品表出错')
      }
    })
  }

  searchChange(e:any){
    this.searchValue=e
    this.getGoodsList()
  }



  notify(): void {
    console.log('notify');
  }

  

}

