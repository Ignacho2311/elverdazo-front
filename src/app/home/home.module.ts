import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeAccountComponent } from './pages/home-account/home-account.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TeamStatisticsComponent } from './pages/team-statistics/team-statistics.component';
import { StatsComparisonComponent } from './pages/stats-comparison/stats-comparison.component';


@NgModule({
  declarations: [
    HomeAccountComponent,
    TeamStatisticsComponent,
    StatsComparisonComponent,
    
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule
  ]
})
export class HomeModule { }
