import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Goods } from 'src/app/entitys/goods';
import { User } from 'src/app/entitys/user';
import { HttpService } from 'src/app/httpserver.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  // user: User={};

  goodsList1?: Goods[];
  goodsList2?: Goods[];
  goodsList3?: Goods[];
  array = ['https://img2.baidu.com/it/u=2117429120,591092306&fm=253&fmt=auto&app=120&f=JPEG?w=690&h=389',
  'https://img1.baidu.com/it/u=600675500,2549315167&fm=253&fmt=auto&app=120&f=JPEG?w=658&h=395', 
  'https://img2.baidu.com/it/u=2117429120,591092306&fm=253&fmt=auto&app=120&f=JPEG?w=690&h=389',
  'https://img1.baidu.com/it/u=600675500,2549315167&fm=253&fmt=auto&app=120&f=JPEG?w=658&h=395',
  'https://img2.baidu.com/it/u=2117429120,591092306&fm=253&fmt=auto&app=120&f=JPEG?w=690&h=389'];
  constructor(private httpService: HttpService,
    private authService: AuthService,
    private message: NzMessageService) { 


  }

  ngOnInit(): void {
    this.httpService.goodsFindAll().subscribe(
      {
        next: data => {
          console.log(data)
          this.goodsList1=data.splice(0,3)
          this.goodsList2=data.splice(0,3)
          this.goodsList3=data.splice(0,3)
        },
        error: error => {
          console.log('获取货物出错')
        
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


  createMessage(type: string,message: string): void {
    this.message.create(type, `${message}`);
  }



}
