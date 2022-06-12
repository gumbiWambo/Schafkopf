import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RankedListRoutingModule } from './ranked-list-routing.module';
import { RankedListComponent } from './ranked-list.component';


@NgModule({
  declarations: [
    RankedListComponent
  ],
  imports: [
    CommonModule,
    RankedListRoutingModule
  ]
})
export class RankedListModule { }
