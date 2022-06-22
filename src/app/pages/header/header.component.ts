import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/entitys/user';
import { HttpService } from 'src/app/httpserver.service';
import { idInterface } from 'src/app/interfaces/id';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


//定义方法向父组件传值

user: User = {};
  constructor(private httpService: HttpService,
    public router: Router,
  ) { 
  

  }

  ngOnInit(): void {
    this.updateUser()
// setTimeout(() =>this.updateUser(),500)
    
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
          this.user={}
          this.user = {account:'未登录'}
          
          console.log('not found');
          console.log(this.user)
        }
      }
    )
  }
  auth() {
    if (!this.user?.userId) {
      this.router.navigate(['/signin'])
      // setTimeout(() =>    this.router.navigate(['/signin']),500)
  
    }
    else {
      this.router.navigate(["/personalcenter"])
      // setTimeout(() =>this.router.navigate(["/personalcenter"]),500)
    }

  }


  cancellation() {
  
    // const id: idInterface = { id: parseInt(localStorage.getItem('userid') as string) };
    const id=this.user?.userId
    if (!id) {
      return;
    }
    console.log('cancellation')
    this.httpService.userSignOut().subscribe(
      data => {
        console.log(data)
        this.user={}
      }
    );

  
    // setTimeout(() =>this.router.navigate([""]),500)
    this.router.navigate([""])
    
  }


  resignin() {
    this.httpService.userSignOut();
    // setTimeout(() => this.router.navigate(['/signin']),500)
    this.router.navigate(['/signin'])
    
  }




//   @Output() private outer = new EventEmitter();
// //定义方法向父组件传值
// setParent(){
//     //向父组件传值
//     this.outer.emit("我是子组件的数据")
//   }

}
