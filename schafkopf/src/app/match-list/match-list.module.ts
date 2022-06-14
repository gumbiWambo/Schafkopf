import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatchListRoutingModule } from './match-list-routing.module';
import { MatchListComponent } from './match-list.component';
import { MatchEntryComponent } from './match-entry/match-entry.component';
import { CreateMatchComponent } from './create-match/create-match.component';


@NgModule({
  declarations: [
    MatchListComponent,
    MatchEntryComponent,
    CreateMatchComponent
  ],
  imports: [
    CommonModule,
    MatchListRoutingModule,
    FormsModule
  ]
})
export class MatchListModule { }
