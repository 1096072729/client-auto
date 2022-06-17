import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router, } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { User, userOne } from 'src/app/entitys/user';
import { HttpService } from 'src/app/httpserver.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

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
      account: ['', [Validators.minLength(2), Validators.maxLength(8)]],
      name: ['', [Validators.minLength(2), Validators.maxLength(8)]],
      password: ['', [Validators.minLength(6), Validators.maxLength(20)]],
      confirmPassword: ['', [Validators.minLength(6), Validators.maxLength(20)]],
      birthday: [''],

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
      this.error = 'account输入不正确'
      return;
    }
    if (this.signUpform.get('name')?.errors) {
      this.error = '昵称输入不正确'
      return;
    }
    if (this.signUpform.get('password')?.errors) {
      this.error = 'password输入格式不正确'
      return;
    }
    console.log(this.signUpform.get('password')?.value + '----' + this.signUpform.get('confirmPassword')?.value)
    if (this.signUpform.get('password')?.value !== this.signUpform.get('confirmPassword')?.value) {
      this.error = '密码和确认密码必须相同'
      return;
    }

    this.error = ''

    this.user.account = this.signUpform.get('account')?.value
    this.user.name = this.signUpform.get('name')?.value
    this.user.password = this.signUpform.get('password')?.value



    this.httpService.createUser(this.user).subscribe(
      {
        next: data => {
          console.log(data)
          console.log('注册成功' + this.user.account)
          this.error = '';
          localStorage.setItem('useraccount', this.user.account as string);
          this.createNotification('success');
          this.get()
        },
        error: (error) => {
          console.log(error)
          this.error = '账号重复';
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
          const id = Userone[0].userId as number;
          localStorage.setItem('userid', id.toString());
          
          setTimeout(() =>  this.router.navigate(['']),1000)
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
