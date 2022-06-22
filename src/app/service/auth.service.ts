import { Injectable } from '@angular/core';
import { Capital } from '../entitys/capital.entity';
import { User } from '../entitys/user';
import { HttpService } from '../httpserver.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  capital: Capital={}
  user: User ={}

  constructor(private httpService:HttpService) {
    this.Authentication()
   }
  Authentication(){
    this.httpService.userWhoAmI().subscribe(
      data => {
       this.user=  data.user
       this.getCapital() 
      },
      err => {
        console.log(err)
        console.log('authservice用户验证失败')
      }
    )
  }

  getCapital() {
    this.httpService.getCapital(this.user).subscribe(
      {
        next: data => {
          console.log('获取资金账户成功')
          this.capital = data;
          console.log(data)
        },
        error: error => {
          console.log('获取资金账户失败')
        }
      }
    )
  }

  updateUser(user:User) {

    this.httpService.updateUser(user).subscribe({
      next: data => {
        console.log('更新用户数据成功')
      },
      error: error => {
        console.log('更新用户数据失败')
      }
    })
  }

  updateCapital() {
    
    this.httpService.patchCapital(this.capital).subscribe({
      next: date => {
        console.log(date);
        console.log('充值成功')
        this.getCapital()
      },
      error: error => {
        console.log(error)
        console.log('充值出现错误')
      }
    })
  }
}
