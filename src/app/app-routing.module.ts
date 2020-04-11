import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TestComponent } from './test/test.component'
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  {path:'login', component: LoginComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full' },
  {path:'home', component: HomeComponent},
  {path:'test', component: TestComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
