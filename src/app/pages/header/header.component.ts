import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/entitys/user';
import { HttpService } from 'src/app/httpserver.service';
import { idInterface } from 'src/app/interfaces/id';
import { AuthService } from 'src/app/server/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output()  outerUser = new EventEmitter();
//定义方法向父组件传值

user?: User = {};
  constructor(private httpService: HttpService,
    public router: Router,
  ) { 
  

  }

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
    if (id==-1) {
      return;
    }
    console.log('cancellation')
    this.httpService.userSignOut().subscribe(
      data => {
        console.log(data)
      }
    );
    
    this.user = {account:'未登录'}
    // setTimeout(() =>this.router.navigate([""]),500)
    this.router.navigate([""])
    
  }


  resignin() {
    this.httpService.userSignOut();
    // setTimeout(() => this.router.navigate(['/signin']),500)
    this.router.navigate(['/signin'])
    
  }


  setParentUser(){
    //向父组件传值
    this.outerUser.emit('this.user')
  }

//   @Output() private outer = new EventEmitter();
// //定义方法向父组件传值
// setParent(){
//     //向父组件传值
//     this.outer.emit("我是子组件的数据")
//   }

}
