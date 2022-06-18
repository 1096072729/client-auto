import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { User } from 'src/app/entitys/user';
import { HttpService } from 'src/app/httpserver.service';

@Component({
  selector: 'app-personal-center',
  templateUrl: './personal-center.component.html',
  styleUrls: ['./personal-center.component.css']
})
export class PersonalCenterComponent implements OnInit {

  user:User={};
  deleteMadal = false;
  passwordVisible = false;
  password?: string;
  constructor(private httpService: HttpService,
    public router: Router,
    private message: NzMessageService) { }

  ngOnInit(): void {
    this.updateUser()
    
  }

  updateUser() {
    this.httpService.userWhoAmI().subscribe(
      {
        next: data => {
          console.log('data')
          console.log(data.user)
          this.user = data.user
        },
        error: error => {

          
          console.log(error);
          
          console.log(this.user)
          this.router.navigate(['/signin'])
        }
      }
    )
  }

  receive_child_user(e:any) {
  
console.log('receive_child_user')
    console.log(e)
}


showModal(): void {
  this.deleteMadal = true;
}

handleOk(): void {
  this.user.password=this.password
  this.httpService.userSignIn(this.user).subscribe(
    {
      next: dat => {
        this.httpService.deleteUser(this.user?.userId as number).subscribe(
          {next: data => {
      console.log('删除账号成功')
      this.createMessage('success','删除账号成功，希望下次还能见到您')
      this.deleteMadal = false;
      this.router.navigate([''])
          },error: error=>{
            
            console.log('删除账号失败')
          }
        
        }
        )
       
      },
      error: () => {
        this.createMessage('error','输入的密码不正确')
        console.log('密码不正确')
      }
    }


  )


  
  
  

}

handleCancel(): void {
  this.createMessage('warning','感谢你能好好考虑，希望能够一直陪伴你')
  console.log('Button cancel clicked!');
  this.deleteMadal = false;
}




createMessage(type: string,message: string): void {
  this.message.create(type, `${message}`);
}


// run(event:any){
//   //此处打印：我是子组件的数据
//   console.log(event)
// }


}
