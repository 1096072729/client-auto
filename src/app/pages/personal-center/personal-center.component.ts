import { Component, OnInit, Output } from '@angular/core';
import { User } from 'src/app/entitys/user';

@Component({
  selector: 'app-personal-center',
  templateUrl: './personal-center.component.html',
  styleUrls: ['./personal-center.component.css']
})
export class PersonalCenterComponent implements OnInit {
 user?: User;
  constructor() { }

  ngOnInit(): void {

  }

  receive_child_user(data: User | undefined) {
    this.user = data
}

}
