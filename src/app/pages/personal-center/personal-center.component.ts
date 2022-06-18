import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { User } from 'src/app/entitys/user';

@Component({
  selector: 'app-personal-center',
  templateUrl: './personal-center.component.html',
  styleUrls: ['./personal-center.component.css']
})
export class PersonalCenterComponent implements OnInit {

  user:User={};
  constructor() { }

  ngOnInit(): void {
    
  }

  receive_child_user(e:any) {
  
console.log('receive_child_user')
    console.log(e)
}

// run(event:any){
//   //此处打印：我是子组件的数据
//   console.log(event)
// }


}
