import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PreferenceRoutingModule } from './preference-routing.module';
import { PreferencesComponent } from './pages/preferences/preferences.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CreatePreferenceComponent } from './pages/create-preference/create-preference.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import {FlexLayoutModule} from '@angular/flex-layout'
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatMenuModule} from '@angular/material/menu'



@NgModule({
  declarations: [
    PreferencesComponent,
    CreatePreferenceComponent
  ],
  imports: [
    CommonModule,
    PreferenceRoutingModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatCardModule,
    MatGridListModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatMenuModule

  ]
})
export class PreferenceModule { }
