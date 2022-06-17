import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './entitys/user';
import { idInterface } from './interfaces/id';


@Injectable({
  providedIn: 'root'
})
export class HttpService {


  constructor(private httpclient: HttpClient) {


  }

  createUser(user: User): Observable<User> {
    const url = environment.apiBaseUrl + 'auth/' + 'signup?role=user';
    console.log('createUser' + user);
    return this.httpclient.post<User>(url, user);
  }

  userSignIn(user: User): Observable<User> {
    const url = environment.apiBaseUrl + 'auth/' + 'signin';
    console.log('signin');
    return this.httpclient.post<User>(url, user);
  }

  userSignOut() {
    const url = environment.apiBaseUrl + 'auth/' + 'signout';
    console.log('signout');
    return this.httpclient.post<any>(url, Option)

  }

  userGet(user: User) {
    const url = environment.apiBaseUrl + 'auth';

    return this.httpclient.get<User[]>(url, { params: new HttpParams().set('account', user.account as string) });
  }
  userWhoAmI() {
    const url = environment.apiBaseUrl + 'auth/' + 'whoami';
    return this.httpclient.get<any>(url);
  }

  goodsFindAll(){
    
    const url = environment.apiBaseUrl + 'goods/' + 'findAll';
    return this.httpclient.get<any>(url);
  }


  goodsFindOne(goodsId:number){
    
    const url = environment.apiBaseUrl + 'goods/' + goodsId;
    return this.httpclient.get<any>(url);
  }



}
