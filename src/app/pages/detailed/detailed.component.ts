import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Goods, goodsone } from 'src/app/entitys/goods';
import { User } from 'src/app/entitys/user';
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

  array = [''];
  goods: Goods = {};
  demoValue = 1;
  isVisible = false;
  isConfirmLoading = false;
  user: User = {};
  showQRCode = false;
  isQRCodeConfirmLoading = false;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private httpService: HttpService) { }

  ngOnInit(): void {
    this.route.params.subscribe((res) => {
      const goodsId = res['goodsId'];
      console.log(goodsId + ':goodsId');
      this.httpService.goodsFindOne(goodsId).subscribe(
        {
          next: data => {
            this.goods = data;
            this.array = this.goods.goodsPic?.split('-') as string[];
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
}
