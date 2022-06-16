import { Component, OnInit } from '@angular/core';
import { Goods,goodsone } from 'src/app/entitys/goods';

@Component({
  selector: 'app-detailed',
  templateUrl: './detailed.component.html',
  styleUrls: ['./detailed.component.css']
})
export class DetailedComponent implements OnInit {
  array = ['https://gd4.alicdn.com/imgextra/i4/2200641045810/O1CN012AP26z1sn1rtVwo3v_!!2200641045810.jpg_400x400.jpg',
  'https://gd4.alicdn.com/imgextra/i4/2200641045810/O1CN012AP26z1sn1rtVwo3v_!!2200641045810.jpg_400x400.jpg', 
  'https://gd4.alicdn.com/imgextra/i4/2200641045810/O1CN012AP26z1sn1rtVwo3v_!!2200641045810.jpg_400x400.jpg',
  'https://gd4.alicdn.com/imgextra/i4/2200641045810/O1CN012AP26z1sn1rtVwo3v_!!2200641045810.jpg_400x400.jpg',
  'https://gd4.alicdn.com/imgextra/i4/2200641045810/O1CN012AP26z1sn1rtVwo3v_!!2200641045810.jpg_400x400.jpg'];


  goods:Goods=goodsone;
  demoValue = 1;
  isVisible = false;
  isConfirmLoading = false;
  constructor( ) { }

  ngOnInit(): void {
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isConfirmLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 1000);
  }

  handleCancel(): void {
    this.isVisible = false;
  }
  
  
  

}
