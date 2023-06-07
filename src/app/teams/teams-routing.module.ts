import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamsComponent } from './pages/teams/teams.component';
import { StatsComponent } from './pages/stats/stats.component';

const routes: Routes = [{
  path:"",
  component:TeamsComponent
},
{
  path:"stats/:id",
  component:StatsComponent
},
{
  path:"**",
  redirectTo:""
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamsRoutingModule { }
