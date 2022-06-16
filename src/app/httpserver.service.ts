import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './entitys/user';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpclient: HttpClient) {


  }

  createUser(user: User): Observable<User> {
    const url = environment.apiBaseUrl +'auth/'+ 'signup';
    console.log('createUser');
    return this.httpclient.post<User>(url, user);
  }

  signIn(user: User): Observable<User> {
    const url = environment.apiBaseUrl +'auth/'+ 'signin';
    console.log('signin');
    return this.httpclient.post<User>(url, user);
  }
}
