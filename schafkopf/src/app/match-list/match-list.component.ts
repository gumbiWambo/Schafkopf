import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatchListService } from './services/match-list.service';

@Component({
  selector: 's-match-list',
  templateUrl: './match-list.component.html',
  styleUrls: ['./match-list.component.scss']
})
export class MatchListComponent implements OnInit, OnDestroy {

  public matchList: any[] = [];
  public matchCreatorOpend = false;

  #listSubscription!: Subscription;

  constructor(private matchListProvider: MatchListService, private router: Router) { }

  ngOnInit(): void {
    this.#listSubscription = this.matchListProvider.matches.subscribe(x => this.matchList = x);
  }

  ngOnDestroy () {
    if(this.#listSubscription) {
      this.#listSubscription.unsubscribe();
    }
    this.closeMatchCreator('');
  }
  
  public openMatchCreator() {
    this.matchCreatorOpend = true;
  }

  public closeMatchCreator(matchId: string) {
    if(matchId) {
      this.matchListProvider.joinMatch(matchId).then(x => {
        this.matchCreatorOpend = false;
        this.router.navigate(['match', matchId]);
      });
    } else {
      this.matchCreatorOpend = false;
    }
  }

}
