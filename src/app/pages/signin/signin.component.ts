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
      email: ['', Validators.email],
      password: ['', [Validators.minLength(6), Validators.maxLength(20)]],


      // email: ['',[Validators.email]],
      // password: ['',[Validators.minLength(6),Validators.maxLength(20)]],
      // confirmPassword: ['',[Validators.minLength(6),Validators.maxLength(20)]],
      // phone: ['',[Validators.length==11]]
    });

  }


  ngOnInit(): void {
  }






  submit() {

    if (this.signUpform.get('email')?.errors) {
      this.error = 'email输入不正确'
      return;
    }

    if (this.signUpform.get('password')?.errors) {
      this.error = 'password输入不正确'
      return;
    }

    this.error = ''

    this.user.email = this.signUpform.get('email')?.value
    this.user.password = this.signUpform.get('password')?.value


    this.httpService.signIn(this.user).subscribe(
      {
        next: data => {
          this.error = '';
          const id = data.id as number;
          localStorage.setItem('userid', id.toString());
          this.createNotification('success');
          this.router.navigate(['',id])
        },
        error: () => {
          this.error = '账号出错';
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
