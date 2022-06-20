import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Capital } from 'src/app/entitys/capital.entity';
import { User } from 'src/app/entitys/user';
import { HttpService } from 'src/app/httpserver.service';

@Component({
  selector: 'app-personal-center',
  templateUrl: './personal-center.component.html',
  styleUrls: ['./personal-center.component.css']
})
export class PersonalCenterComponent implements OnInit {
capital:Capital={};
  user:User={};
  deleteMadal = false;
  passwordVisible = false;
  password?: string;
  constructor(private httpService: HttpService,
    public router: Router,
    private message: NzMessageService) { }

  ngOnInit(): void {
    this.getUser()
    
  }

  ngOnDestroy(): void {
    console.log('this.user')
    console.log(this.user)
    this.updateUser()
   }

  getUser() {
    this.httpService.userWhoAmI().subscribe(
      {
        next: data => {
          console.log('data')
          console.log(data.user)
          this.user = data.user
          this.getCapital()
        },
        error: error => {
          console.log(error);
          
          console.log(this.user)
          this.router.navigate(['/signin'])
        }
      }
    )
  }

  getCapital(){
    this.httpService.getCapital(this.user).subscribe(
      {
        next: data => {
          console.log('获取资金账户成功')
          this.capital=data;
          console.log(data)
        },
        error: error => {
          console.log('获取资金账户失败')
        }
      }
    )
  }


showModal(): void {
  this.deleteMadal = true;
}

handleOk(): void {
  this.user.password=this.password
  this.httpService.userSignIn(this.user).subscribe(
    {
      next: date => {
        this.deleteuser()
      },
      error: () => {
        this.createMessage('error','输入的密码不正确')
        console.log('密码不正确')
      }
    }
  )

}

deleteuser(){
  this.httpService.deleteUser(this.user).subscribe(
    {next: data => {
console.log('删除账号成功')
this.createMessage('success','删除账号成功，希望下次还能见到您')
this.deleteCapital()
    },
    error: error=>{
      
      
      console.log('删除账号失败')
    }
  
  }
  )
}


deleteCapital(){
  this.httpService.deleteCapital(this.capital).subscribe(
    {next: data => {
console.log('删除资金账号成功')
this.createMessage('success','删除资金账号成功，希望下次还能见到您')
this.deleteMadal = false;
this.router.navigate([''])
    },error: error=>{
      console.log(error)
      
      console.log('删除资金账号失败')
    }
  
  }
  )
}

handleCancel(): void {
  this.createMessage('warning','感谢你能好好考虑，希望能够一直陪伴你')
  console.log('Button cancel clicked!');
  this.deleteMadal = false;
}


submitPerson(){
  console.log('submitPerson')
}




createMessage(type: string,message: string): void {
  this.message.create(type, `${message}`);
}


updateUser() {
  
this.httpService.updateUser(this.user).subscribe({
  next:data => {
    console.log('更新用户数据成功')
  },
  error: error => {
    console.log('更新用户数据失败')
  }
})
}


// run(event:any){
//   //此处打印：我是子组件的数据
//   console.log(event)
// }


}
