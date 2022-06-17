import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { User, userOne } from 'src/app/entitys/user';
import { HttpService } from 'src/app/httpserver.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  user: User = userOne;
  signUpform: FormGroup;
  hide = true;
  confirmHide = true;
  error = '';
  constructor(private formBuilder: FormBuilder,
    private httpService: HttpService,
    private notification: NzNotificationService,
    public router: Router) {
    this.signUpform = this.formBuilder.group({
      account: ['',[Validators.minLength(2), Validators.maxLength(8)]],
      password: ['', [Validators.minLength(6), Validators.maxLength(20)]],


      // account: ['',[Validators.account]],
      // password: ['',[Validators.minLength(6),Validators.maxLength(20)]],
      // confirmPassword: ['',[Validators.minLength(6),Validators.maxLength(20)]],
      // phone: ['',[Validators.length==11]]
    });

  }


  ngOnInit(): void {
  }






  submit() {

    if (this.signUpform.get('account')?.errors) {
      this.error = '账号名输入不正确'
      return;
    }

    if (this.signUpform.get('password')?.errors) {
      this.error = '密码输入不正确'
      return;
    }

    this.error = ''

    this.user.account = this.signUpform.get('account')?.value
    this.user.password = this.signUpform.get('password')?.value


    this.httpService.userSignIn(this.user).subscribe(
      {
        next: data => {
          this.error = '';
          
          this.get();
          this.createNotification('success');
         
        },
        error: () => {
          this.error = '账号或密码出错';
        }
      }


    )
  }

  

  get() {
    console.log(this.user.account)
    this.httpService.userGet(this.user).subscribe(
      {
        next: Userone => {
          this.user = Userone[0];
          console.log('this.user')
          console.log(this.user)
          const id = Userone[0].userId as number;
          localStorage.setItem('userid', id.toString());
          setTimeout(() =>       this.router.navigate(['']),1000)
       
        },
        error: Error => {
          console.log(Error)
          console.log('get出错')

        }
      }
    )
  }


  createNotification(type: string): void {
    this.notification.create(
      type,
      '创建成功',
      '欢迎您使用自动发卡平台'
    );
  }
}
