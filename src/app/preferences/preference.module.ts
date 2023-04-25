import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PreferenceRoutingModule } from './preference-routing.module';
import { PreferencesComponent } from './pages/preferences/preferences.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PreferencesComponent
  ],
  imports: [
    CommonModule,
    PreferenceRoutingModule,
    ReactiveFormsModule
  ]
})
export class PreferenceModule { }
