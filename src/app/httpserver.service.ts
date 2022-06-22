import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BuyRecords } from './entitys/bugRecords.entity';
import { Capital } from './entitys/capital.entity';
import { Goods } from './entitys/goods';
import {  Star } from './entitys/mart.entity';
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
  updateUser(user: User) {
    // http://120.55.54.248:3000/auth/23?role=user
    const url = environment.apiBaseUrl + 'auth/'+user.userId+'?role=user'
    return this.httpclient.patch(url, user)
  }

  deleteUser(user: User) {
   
    const url = environment.apiBaseUrl + 'auth/' + user.userId;
    return this.httpclient.delete<any>(url);
  }




  goodsFindAll(){
    
    const url = environment.apiBaseUrl + 'goods/' + 'findAll';
    return this.httpclient.get<any>(url);
  }


  goodsFindOne(goodsId:number){
    
    const url = environment.apiBaseUrl + 'goods/' + goodsId;
    return this.httpclient.get<any>(url);
  }

searchGoods(page:number,searchValue:string):Observable<any>{
  // http://120.55.54.248:3000/goods/paging/1
const url = environment.apiBaseUrl + 'goods/paging/'+page;

const content:any={searchValue: searchValue}
return this.httpclient.post<any>(url,content);
}

  capitalCreate(user:User){
    // http://120.55.54.248:3000/capital/create
    const url = environment.apiBaseUrl + 'capital/' + 'create';
    return this.httpclient.post(url,user)
  }

  getCapital(user:User){
    console.log('getCapital')
    console.log(user)
    // http://120.55.54.248:3000/capital/account/tyutyu
    const url = environment.apiBaseUrl + 'capital/' + 'account/'+user.account;
    return this.httpclient.get(url)
  }

  deleteCapital(capital:Capital){
    // http://localhost:4200/api/capital/xcvxcv
    // http://120.55.54.248:3000/capital/060b4bc6-cc6b-44d2-ace5-ffd53632aa94
    console.log('deleteCapital')
    const url = environment.apiBaseUrl + 'capital/'+capital.cid;
    return this.httpclient.delete(url)
  }

  patchCapital(capital: Capital){
    // http://120.55.54.248:3000/capital/12
    console.log('patchCapital')
    const url = environment.apiBaseUrl + 'capital/'+capital.cid;
    return this.httpclient.patch(url,capital)
  }

  createBuyRecords(user: User,goods: Goods){
   
     // http://120.55.54.248:3000/buyRecords/create
    //  console.log('createBuyRecords')
    //  user=Object.assign({...user,...goods}) 
     const content:any={ userId: user.userId,goodsId: goods.goodsId,buyPrice: goods.currentPrice}
     const url = environment.apiBaseUrl + 'buyRecords/'+'create';
     return this.httpclient.post(url, content)

 }

buyRecordsByUser(user: User): Observable<BuyRecords[]>{
  //  http://120.55.54.248:3000/buyRecords/user/78
  console.log('buyRecordsByUser')
  const url = environment.apiBaseUrl +'buyRecords/user/'+user.userId
  return this.httpclient.get<BuyRecords[]>(url)
}

 upload(img:File[]):Observable<any>{
  // http://120.55.54.248:3000/upload
console.log('upload')
const url=environment.apiBaseUrl+'upload';
return this.httpclient.post(url, img)
 }

 createStar(user: User,goods: Goods){
   
  // http://120.55.54.248:3000/buyRecords/create

  const content:any={ userId: user.userId,goodsId: goods.goodsId,starPrice: goods.currentPrice}
  console.log(content)
  console.log('content')
  const url = environment.apiBaseUrl + 'star/'+'create';
  return this.httpclient.post(url, content);



 }
starFindByUser(user:User):Observable<Star[]>{

  // http://120.55.54.248:3000/star/user/1
const url = environment.apiBaseUrl + 'star/user/'+user.userId
return this.httpclient.get<Star[]>(url)
}

deleteStar(star:Star){
  // http://120.55.54.248:3000/star/1
const url = environment.apiBaseUrl + 'star/'+star.starId
return this.httpclient.delete<Star[]>(url)
}

}