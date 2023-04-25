import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path:"auth",
    loadChildren:() => import("./auth/auth.module").then(m => m.AuthModule)
  },
  {
    path:"home",
    loadChildren:() => import("./home/home.module").then(m => m.HomeModule),
    canActivate:[AuthGuard],
    canLoad:[AuthGuard]
  },
  {
    path:"mypreferences",
    loadChildren:() => import("./preferences/preference.module").then(m=>m.PreferenceModule),
    canActivate:[AuthGuard],
    canLoad:[AuthGuard]
  },
  {
    path:"**",
    redirectTo:"auth"
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
