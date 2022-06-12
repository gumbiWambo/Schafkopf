import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RankedListComponent } from './ranked-list.component';

const routes: Routes = [{ path: '', component: RankedListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RankedListRoutingModule { }
