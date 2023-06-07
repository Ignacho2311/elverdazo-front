import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamsRoutingModule } from './teams-routing.module';
import { TeamsComponent } from './pages/teams/teams.component';
import { MatCardModule  } from '@angular/material/card';
import { MatGridListModule  } from '@angular/material/grid-list';
import { StatsComponent } from './pages/stats/stats.component';
import {MatIconModule} from '@angular/material/icon'

@NgModule({
  declarations: [
    TeamsComponent,
    StatsComponent
  ],
  imports: [
    CommonModule,
    TeamsRoutingModule,
    MatCardModule,
    MatGridListModule,
    MatIconModule
  ]
})
export class TeamsModule { }
