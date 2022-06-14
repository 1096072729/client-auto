import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { User } from 'src/app/entitys/user';
import { HttpService } from 'src/app/httpserver.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  user?: User;
  signUpform: FormGroup;
  hide = true;
  confirmHide = true;
  constructor(private formBuilder: FormBuilder,
    private httpService:HttpService) {
    this.signUpform = this.formBuilder.group({
      email: ['',Validators.email],
      name:['',[Validators.minLength(2),Validators.maxLength(8)]],
      password: ['',[Validators.minLength(6),Validators.maxLength(20)]],
      confirmPassword: ['',[Validators.minLength(6),Validators.maxLength(20)]],
      birthday:[''],

      // email: ['',[Validators.email]],
      // password: ['',[Validators.minLength(6),Validators.maxLength(20)]],
      // confirmPassword: ['',[Validators.minLength(6),Validators.maxLength(20)]],
      // phone: ['',[Validators.length==11]]
    });

  }


  ngOnInit(): void {
  }


  
  submit(){
    const email=this.signUpform.get('email')?.value
    const name=this.signUpform.get('name')?.value
    const password=this.signUpform.get('password')?.value
    const birthday=this.signUpform.get('birthday')?.value
    this.user= Object.create({email,name,password,birthday})

    this.httpService.createUser( this.user).subscribe(data => {
      console.log(data)
    })
    console.log( this.user)
  }


}
