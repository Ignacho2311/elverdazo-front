import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreferencesComponent } from './pages/preferences/preferences.component';

const routes: Routes = [{
  path:"",
  component:PreferencesComponent
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
