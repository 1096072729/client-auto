import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { BodyComponent } from './pages/body/body.component';
import { DetailedComponent } from './pages/detailed/detailed.component';
import { PersonalCenterComponent } from './pages/personal-center/personal-center.component';
import { SearchComponent } from './pages/search/search.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { SigninComponent } from './pages/signin/signin.component';


const routes: Routes = [
  {path:'signup',component: SignUpComponent},
  {path:'signin',component: SigninComponent},
  {path:'personalcenter',component: PersonalCenterComponent},
  {path:'search',component: SearchComponent},
  {path:'index',component: IndexComponent,children:[
    {path:'detailed',component: DetailedComponent},
    {path:'',component: BodyComponent}
  ]},
  
  {path:'',component: IndexComponent,children:[
  
    {path:'detailed/:goodsId',component: DetailedComponent},
    {path:'',component: BodyComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'top', // 这里管跳转路由后页面始终在顶部
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
