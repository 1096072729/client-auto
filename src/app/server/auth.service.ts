import { Injectable } from '@angular/core';
import { HttpService } from '../httpserver.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpService:HttpService) { }

  Authentication(){
    this.httpService.userWhoAmI().subscribe(
      data => {
        return  data.user
      }
    )
  }
}
