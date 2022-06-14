import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';


const routes: Routes = [
  {path:'signup',component: SignUpComponent},
  {path:'',component:IndexComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
