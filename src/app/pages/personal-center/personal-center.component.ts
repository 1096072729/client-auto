import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable, Observer } from 'rxjs';
import { BuyRecords } from 'src/app/entitys/bugRecords.entity';
import { Capital } from 'src/app/entitys/capital.entity';
import { Goods } from 'src/app/entitys/goods';
import { Star } from 'src/app/entitys/mart.entity';
import { User } from 'src/app/entitys/user';
import { HttpService } from 'src/app/httpserver.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-personal-center',
  templateUrl: './personal-center.component.html',
  styleUrls: ['./personal-center.component.css']
})
export class PersonalCenterComponent implements OnInit {
  capital: Capital = {};
  user: User = {};
  deleteMadal = false;
  changePasswordMadal = false;
  passwordVisible = false;
  password?: string;

  showQRCode = false;
  oldPassword?: string;
  newPassword?: string;
  isQRCodeConfirmLoading = false;
  Rechargevalue: number = 20;
  loading = false;
  avatarUrl?: string;
  buyRecordspage = 1;
  martPage = 1;
  buyRecordslist: BuyRecords[] = []
  goodslist: Goods[] = []
  buyRecordspa: BuyRecords[] = []
  martGoodsList: Goods[] = []
  martList: Star[] = []
  martpa: Star[] = []
  constructor(private httpService: HttpService,
    public router: Router,
    private message: NzMessageService,
    private authService: AuthService,) {
    this.getUser()
  }

  ngOnInit(): void {
    // this.getUser()

  }

  ngOnDestroy(): void {
    console.log('this.user')
    console.log(this.user)
    this.updateUser()
  }





  pageChange() {
    console.log('pagechange')
    console.log(this.buyRecordspage)
    this.buyRecordspa = this.buyRecordslist.slice(5 * this.buyRecordspage - 5, 5 * this.buyRecordspage)
    console.log(this.buyRecordspa)
    this.goodslist = []
    for (const element of this.buyRecordspa) {
      this.httpService.goodsFindOne(element.goodsId).subscribe(
        {
          next: data => {
            this.goodslist.push(data);
            console.log(data)

          },
          error: error => {
            console.log(error);
          }
        }
      )
    }
  }

  martPageChange() {

    this.martpa = this.martList.slice(6 * this.martPage - 6, 6 * this.martPage)

    this.martGoodsList = []
    for (const element of this.martpa) {
      this.httpService.goodsFindOne(element.goodsId).subscribe(
        {
          next: data => {
            this.martGoodsList.push(data);
            console.log(data)

          },
          error: error => {
            console.log(error);
          }
        }
      )
    }
  }


  //????????????madal
  showModal(): void {
    this.deleteMadal = true;
  }

  handleOk(): void {
    this.user.password = this.password
    this.httpService.userSignIn(this.user).subscribe(
      {
        next: date => {
          this.deleteuser()
        },
        error: () => {
          this.createMessage('error', '????????????????????????')
          console.log('???????????????')
        }
      }
    )
  }
  handleCancel(): void {
    this.createMessage('warning', '??????????????????????????????????????????????????????')
    console.log('Button cancel clicked!');
    this.deleteMadal = false;
  }



  //????????????madal
  showchangePasswordModal(): void {
    this.changePasswordMadal = true;
  }

  changePasswordOk(): void {
    var userOne = JSON.parse(JSON.stringify(this.user));
    userOne.password = this.oldPassword
    this.httpService.userSignIn(userOne).subscribe(
      {
        next: date => {
          this.user.password = this.password
          this.updateUser()
          this.changePasswordMadal = false;
          this.createMessage('success', '??????????????????????????????????????????????????????')
          this.newPassword = '';
          this.oldPassword = ''
        },
        error: () => {
          this.createMessage('error', '????????????????????????')
          console.log('???????????????')
        }
      }
    )

  }


  changePasswordCancel(): void {
    this.createMessage('warning', '??????????????????????????????????????????????????????')
    console.log('Button cancel clicked!');
    this.changePasswordMadal = false;
  }


  submitPerson() {
    console.log('submitPerson')
  }



  //????????????Message
  createMessage(type: string, message: string): void {
    this.message.create(type, `${message}`);
  }




  //????????????????????????madal
  showQRCodeModal(): void {
    setTimeout(() => { this.QRCodeCancel() }, 10000)
    this.showQRCode = true;
  }

  QRCodeOk(): void {
    this.isQRCodeConfirmLoading = true;
    this.Recharge()
    setTimeout(() => {
      this.showQRCode = false;
      this.isQRCodeConfirmLoading = false;

      console.log('QRCodeOk')
    }, 1000);
  }

  QRCodeCancel(): void {
    this.showQRCode = false;
  }



  getUser() {
    this.httpService.userWhoAmI().subscribe(
      {
        next: data => {
          console.log('data')
          console.log(data.user)
          this.user = data.user
          this.getCapital()
          this.buyRecordsByUser()
          this.starFindByUser()
        },
        error: error => {
          console.log(error);

          console.log(this.user)
          this.router.navigate(['/signin'])
        }
      }
    )
  }

  getCapital() {
    this.httpService.getCapital(this.user).subscribe(
      {
        next: data => {
          console.log('????????????????????????')
          this.capital = data;
          console.log(data)
        },
        error: error => {
          console.log('????????????????????????')
        }
      }
    )
  }


  deleteuser() {
    this.httpService.deleteUser(this.user).subscribe(
      {
        next: data => {
          console.log('??????????????????')
          this.createMessage('success', '????????????????????????????????????????????????')
          this.deleteCapital()
        },
        error: error => {


          console.log('??????????????????')
        }

      }
    )
  }


  deleteCapital() {
    this.httpService.deleteCapital(this.capital).subscribe(
      {
        next: data => {
          console.log('????????????????????????')
          this.createMessage('success', '??????????????????????????????????????????????????????')
          this.deleteMadal = false;
          this.router.navigate([''])
        }, error: error => {
          console.log(error)

          console.log('????????????????????????')
        }

      }
    )
  }

  Recharge() {
    this.capital.balance = this.capital.balance as number + this.Rechargevalue;
    this.httpService.patchCapital(this.capital).subscribe({
      next: date => {
        console.log(date);
        console.log('????????????')
        this.authService.getCapital()
      },
      error: error => {
        console.log(error)
        console.log('??????????????????')
      }
    })
  }
  //??????????????????
  buyRecordsByUser() {
    this.httpService.buyRecordsByUser(this.user).subscribe({
      next: data => {
        this.buyRecordslist = data
        console.log('asdasd')
        console.log(data)

        console.log('??????????????????????????????')
        this.pageChange()
      },
      error: error => {
        console.log('??????????????????????????????')
      }
    })
  }

  //??????????????????
  starFindByUser() {
    this.httpService.starFindByUser(this.user).subscribe({
      next: date => {
        this.martList = date
        console.log('????????????????????????')
        this.martPageChange()
      },
      error: error => {
        console.log(error)
        console.log('????????????????????????')

      }
    })
  }

  // sortByDate(buyRecordslist: BuyRecords[]){
  // for(let i=0; i<buyRecordslist.length;i++){
  //   for(let j=buyRecordslist.length; j>0;j--){
  //     if(buyRecordslist[j].buyDate>buyRecordslist[j-1].buyDate){
  //       [buyRecordslist[j],buyRecordslist[j-1]]= [buyRecordslist[j-1],buyRecordslist[j]]
  //     }
  //   }
  // }

  // return buyRecordslist
  // }

  updateUser() {

    this.httpService.updateUser(this.user).subscribe({
      next: data => {
        console.log('????????????????????????')
      },
      error: error => {
        console.log('????????????????????????')
      }
    })
  }

  beforeUpload = (file: NzUploadFile, _fileList: NzUploadFile[]): Observable<boolean> =>
    new Observable((observer: Observer<boolean>) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        this.message.error('You can only upload JPG file!');
        observer.complete();
        return;
      }
      const isLt2M = file.size! / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.message.error('Image must smaller than 2MB!');
        observer.complete();
        return;
      }
      observer.next(isJpgOrPng && isLt2M);
      observer.complete();
    });

  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);
    // console.log('img')
    // console.log(img)
    //     this.httpService.upload([img]).subscribe({
    //       next:data => {
    //         console.log('Upload??????')
    // console.log(data.data.path);
    //       }
    //       ,error: error => {
    //         console.log('Upload??????')
    //         console.log(error)
    //       }
    //     })
  }

  handleChange(info: { file: NzUploadFile }): void {
    console.log(info)
    console.log('info')
    this.user.avatarUrl = info.file.response.data.path
    this.updateUser()
    switch (info.file.status) {
      case 'uploading':
        this.loading = true;
        break;
      case 'done':
        // Get this url from response in real world.
        this.getBase64(info.file!.originFileObj!, (img: string) => {
          this.loading = false;
          this.avatarUrl = img;
          this.message.success('??????????????????');
        });
        break;
      case 'error':
        this.message.error('Network error');
        this.loading = false;
        break;
    }
  }

  //??????
  star(goods: Goods) {

    this.httpService.createStar(this.authService.user, goods).subscribe({
      next: data => {
        this.createMessage('success', '????????????')
      },
      error: error => {
        console.log(error)
        this.createMessage('error', '????????????')
      }
    })
  }
  unStar(star: Star) {
    this.httpService.deleteStar(star).subscribe({
      next: data => {
        this.starFindByUser()
        this.createMessage('success', '??????????????????')
      },
      error: error => {
        this.createMessage('error', '??????????????????')
      }
    })
  }


}
