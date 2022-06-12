import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatchListRoutingModule } from './match-list-routing.module';
import { MatchListComponent } from './match-list.component';


@NgModule({
  declarations: [
    MatchListComponent
  ],
  imports: [
    CommonModule,
    MatchListRoutingModule
  ]
})
export class MatchListModule { }
