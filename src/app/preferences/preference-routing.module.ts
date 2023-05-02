import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreferencesComponent } from './pages/preferences/preferences.component';
import { CreatePreferenceComponent } from './pages/create-preference/create-preference.component';

const routes: Routes = [{
  path:"",
  component:PreferencesComponent
},
{
  path:"create-preference",
  component:CreatePreferenceComponent
},
{
  path:"**",
  redirectTo:""
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PreferenceRoutingModule { }
