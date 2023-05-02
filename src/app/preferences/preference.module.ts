import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PreferenceRoutingModule } from './preference-routing.module';
import { PreferencesComponent } from './pages/preferences/preferences.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CreatePreferenceComponent } from './pages/create-preference/create-preference.component';


@NgModule({
  declarations: [
    PreferencesComponent,
    CreatePreferenceComponent
  ],
  imports: [
    CommonModule,
    PreferenceRoutingModule,
    ReactiveFormsModule
  ]
})
export class PreferenceModule { }
