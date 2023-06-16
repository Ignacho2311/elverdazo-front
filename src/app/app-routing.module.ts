import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path:"home",
    loadChildren:() => import("./home/home.module").then(m => m.HomeModule),
  },
  {
    path:"auth",
    loadChildren:() => import("./auth/auth.module").then(m => m.AuthModule)
  },
  {
    path:"mypreferences",
    loadChildren:() => import("./preferences/preference.module").then(m=>m.PreferenceModule),
    canActivate:[AuthGuard],
    canLoad:[AuthGuard]
  },
  {
    path:"news",
    loadChildren:()=> import("./news/news.module").then(m=>m.NewsModule),
  },
  {
    path:"teams",
    loadChildren:()=> import("./teams/teams.module").then(m=>m.TeamsModule),
    canActivate:[AuthGuard],
    canLoad:[AuthGuard]
  },
  {
    path:"create-preference",
    loadChildren:() => import("./preferences/preference.module").then(m=>m.PreferenceModule),
    canActivate:[AuthGuard],
    canLoad:[AuthGuard]
  },
  {
    path:"**",
    redirectTo:"home"
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
