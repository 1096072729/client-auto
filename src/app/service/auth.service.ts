import { Injectable } from '@angular/core';
import { User } from '../entitys/user';
import { HttpService } from '../httpserver.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpService:HttpService) {
    this.Authentication()
   }
user: User ={}
  Authentication(){
    this.httpService.userWhoAmI().subscribe(
      data => {
       this.user=  data.user
      },
      err => {
        console.log(err)
        console.log('authservice用户验证失败')
      }
    )
  }
}
