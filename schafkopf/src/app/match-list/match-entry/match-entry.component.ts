import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Match } from 'src/app/interfaces/match.interface';
import { MatchListService } from '../services/match-list.service';

@Component({
  selector: 's-match-entry',
  templateUrl: './match-entry.component.html',
  styleUrls: ['./match-entry.component.scss']
})
export class MatchEntryComponent implements OnInit {

  @Input() match!: Match;

  #matchProvider: MatchListService;
  #router: Router

  constructor(matchProvider: MatchListService, router: Router) {
    this.#matchProvider = matchProvider;
    this.#router = router;
  }

  ngOnInit(): void {
  }

  joinGame() {
    this.#matchProvider.joinMatch(this.match.id).then(x => {
      if(!!x) {
        this.#router.navigate(['match', this.match.id]);
      }
    })
  }

}
