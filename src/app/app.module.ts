import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IndexComponent } from './index/index.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';

import {MatFormFieldModule } from '@angular/material/form-field';

import { MatCardModule } from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { HeaderComponent } from './pages/header/header.component';
import {MatTabsModule} from '@angular/material/tabs';
import { SearchComponent } from './pages/search/search.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { HttpService } from './httpserver.service';
import { HttpClientModule } from '@angular/common/http';
import { BodyComponent } from './pages/body/body.component';
import { SigninComponent } from './pages/signin/signin.component';
import { SearchheaderComponent } from './pages/searchheader/searchheader.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { zh_CN } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { DetailedComponent } from './pages/detailed/detailed.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { PersonalCenterComponent } from './pages/personal-center/personal-center.component';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { AuthService } from './server/auth.service';
registerLocaleData(zh);


@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    SignUpComponent,
    HeaderComponent,
    SearchComponent,
    BodyComponent,
    SigninComponent,
    SearchheaderComponent,
    DetailedComponent,
    PersonalCenterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  
  
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatSnackBarModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatChipsModule,
    MatSelectModule,
    MatListModule,
    MatCheckboxModule,
    MatSortModule,
    MatPaginatorModule,
    MatTabsModule,
    MatAutocompleteModule,
    NzCarouselModule,
    NzGridModule,
    NzInputNumberModule,
    NzButtonModule,
    NzIconModule,
    NzModalModule,
    NzAvatarModule,
    NzDividerModule,
    NzAlertModule,
    NzNotificationModule,
    NzDropDownModule,
  ],
  providers: [HttpService, { provide: NZ_I18N, useValue: zh_CN },AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
