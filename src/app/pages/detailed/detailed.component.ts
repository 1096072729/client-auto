import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Goods, goodsone } from 'src/app/entitys/goods';
import { User } from 'src/app/entitys/user';
import { HttpService } from 'src/app/httpserver.service';
import { AuthService } from 'src/app/service/auth.service';

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

  array:string[] = [];
  goods: Goods = {};
  demoValue = 1;
  isVisible = false;
  isConfirmLoading = false;
  user: User = {};
  showQRCode = false;
  isQRCodeConfirmLoading = false;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private httpService: HttpService,
    private message: NzMessageService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.route.params.subscribe((res) => {
      const goodsId = res['goodsId'];
      console.log(goodsId + ':goodsId');
      this.httpService.goodsFindOne(goodsId).subscribe(
        {
          next: data => {
            this.goods = data;
            // this.array = this.goods.goodsPic?.split('-') as string[];
           this.goods.goodsPic?.split('$').map((p)=>{this.array.push( 'http://120.55.54.248:80/'+p)})
           console.log('array')
           console.log(this.array)
          },
          error: error => {
            console.log(error);
          }
        }
      )
    }

    )

  

    this.getUser()
    // const goodsId = this.route.snapshot.paramMap.get('goodsId');



    // this.hero$ = this.service.getHero(heroId);
  }

  money(){
    return this.goods.currentPrice as number *this.demoValue
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isConfirmLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
      this.showQRCodeModal();

    }, 1000);
    setTimeout(() => { this.QRCodeCancel() }, 10000)
  }

  handleCancel(): void {
    this.isVisible = false;
  }


  showQRCodeModal(): void {
    this.showQRCode = true;
  }

  QRCodeOk(): void {
    this.isQRCodeConfirmLoading = true;
    for (let i = 0; i < this.demoValue; i++) {
      this.createBuyRecords();
    }
    setTimeout(() => {
      this.showQRCode = false;
      this.isQRCodeConfirmLoading = false;
      this.message.create('success', '购买成功')
      console.log('QRCodeOk')
    }, 1000);
  }

  QRCodeCancel(): void {
    this.showQRCode = false;
  }


  createBuyRecords() {
    this.httpService.createBuyRecords(this.user, this.goods).subscribe({
      next: () => {
        console.log("创建订单成功");
      },
      error: (error) => {

        console.log(error)
        console.log("创建订单失败");
      }
    }
    )
  }

  getUser() {
    this.httpService.userWhoAmI().subscribe(
      {
        next: data => {
          console.log('data')
          console.log(data.user)
          this.user = data.user
        },
        error: error => {
          this.user = {}
          this.user = { account: '未登录' }

          console.log('not found');
          console.log(this.user)
        }
      }
    )
  }

  
  star(goods:Goods){
    
    this.httpService.createStar(this.authService.user,goods).subscribe({
      next:data => {
        this.createMessage('success', '收藏成功')
      },
      error: error => {
        console.log(error)
        this.createMessage('error', '收藏失败')
      }
    })
      }

  //创建一个Message
  createMessage(type: string, message: string): void {
    this.message.create(type, `${message}`);
  }
}
