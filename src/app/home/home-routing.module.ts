import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeAccountComponent } from './pages/home-account/home-account.component';
import { TeamStatisticsComponent } from './pages/team-statistics/team-statistics.component';
import { StatsComparisonComponent } from './pages/stats-comparison/stats-comparison.component';

const routes: Routes = [{
  path:"",
  component:HomeAccountComponent
},
{
  path:"team-stats/:id",
  component:TeamStatisticsComponent
},
{
  path:"stats-comparison/:id1/:id2",
  component:StatsComparisonComponent
},
{
  path:"**",
  redirectTo:""
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
