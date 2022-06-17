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
    const url = environment.apiBaseUrl +'auth/'+ 'signup?role=user';
    console.log('createUser'+user);
    return this.httpclient.post<User>(url, user);
  }

  signIn(user: User): Observable<User> {
    const url = environment.apiBaseUrl +'auth/'+ 'signin';
    console.log('signin');
    return this.httpclient.post<User>(url, user);
  }

  signOut(): Observable<User>{
    const url = environment.apiBaseUrl +'auth/'+ 'signout';
    console.log('signout');
    return this.httpclient.delete<User>(url)
  }

  // get(user:User): Observable<User>{
  //   console.log(user.account+'account');
  //   const url = environment.apiBaseUrl +'auth?account='+user.account;
  //   console.log(url);
  //   // const url='http://120.55.54.248:3000/auth?account=asdasd'
  //   http://120.55.54.248:3000/auth?account=123asd
 
  //   return this.httpclient.get(url);
  // }
    get(user:User){
    console.log(user.account+'account');
    const url = environment.apiBaseUrl+'auth';
    console.log(url);
 
    return this.httpclient.get<User[]>(url,{ params: new HttpParams().set('account',user.account as string) });
  }

}
