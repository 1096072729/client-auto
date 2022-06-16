import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  array = ['https://img2.baidu.com/it/u=2117429120,591092306&fm=253&fmt=auto&app=120&f=JPEG?w=690&h=389',
  'https://img1.baidu.com/it/u=600675500,2549315167&fm=253&fmt=auto&app=120&f=JPEG?w=658&h=395', 
  'https://img2.baidu.com/it/u=2117429120,591092306&fm=253&fmt=auto&app=120&f=JPEG?w=690&h=389',
  'https://img1.baidu.com/it/u=600675500,2549315167&fm=253&fmt=auto&app=120&f=JPEG?w=658&h=395',
  'https://img2.baidu.com/it/u=2117429120,591092306&fm=253&fmt=auto&app=120&f=JPEG?w=690&h=389'];
  constructor() { }

  ngOnInit(): void {
  }

}
