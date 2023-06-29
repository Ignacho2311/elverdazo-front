import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeAccountComponent } from './pages/home-account/home-account.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TeamStatisticsComponent } from './pages/team-statistics/team-statistics.component';
import { StatsComparisonComponent } from './pages/stats-comparison/stats-comparison.component';
import { FooterComponent } from '../footer/footer.component';
import { TeamStatistics2Component } from './pages/team-statistics2/team-statistics2.component';


@NgModule({
  declarations: [
    HomeAccountComponent,
    TeamStatisticsComponent,
    StatsComparisonComponent,
    FooterComponent,
    TeamStatistics2Component
    
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule
  ]
})
export class HomeModule { }
