import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Goods,goodsone } from 'src/app/entitys/goods';
import { HttpService } from 'src/app/httpserver.service';

@Component({
  selector: 'app-detailed',
  templateUrl: './detailed.component.html',
  styleUrls: ['./detailed.component.css']
})
export class DetailedComponent implements OnInit {
  // array = ['https://gd4.alicdn.com/imgextra/i4/2200641045810/O1CN012AP26z1sn1rtVwo3v_!!2200641045810.jpg_400x400.jpg',
  // 'https://gd4.alicdn.com/imgextra/i4/2200641045810/O1CN012AP26z1sn1rtVwo3v_!!2200641045810.jpg_400x400.jpg', 
  // 'https://gd4.alicdn.com/imgextra/i4/2200641045810/O1CN012AP26z1sn1rtVwo3v_!!2200641045810.jpg_400x400.jpg',
  // 'https://gd4.alicdn.com/imgextra/i4/2200641045810/O1CN012AP26z1sn1rtVwo3v_!!2200641045810.jpg_400x400.jpg',
  // 'https://gd4.alicdn.com/imgextra/i4/2200641045810/O1CN012AP26z1sn1rtVwo3v_!!2200641045810.jpg_400x400.jpg'];
  
array =[''];
  goods:Goods={};
  demoValue = 1;
  isVisible = false;
  isConfirmLoading = false;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private httpService: HttpService) { }

  ngOnInit(): void {
    this.route.params.subscribe((res)=>{
      const goodsId =res['goodsId'];
      console.log(goodsId+':goodsId');
      this.httpService.goodsFindOne(goodsId).subscribe(
      {
        next:data => {
          this.goods= data;
          this.array=this.goods.goodsPic?.split('-')as string[];
        }, 
        error:error => {
          console.log(error);
        }
      }
      )
    }
    
    )
    // const goodsId = this.route.snapshot.paramMap.get('goodsId');
    

    
    // this.hero$ = this.service.getHero(heroId);
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isConfirmLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 1000);
  }

  handleCancel(): void {
    this.isVisible = false;
  }
  
  
  

}
