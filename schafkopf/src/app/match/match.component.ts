import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap, take } from 'rxjs';
import { MatchService } from './services/match.service';

@Component({
  selector: 's-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss']
})
export class MatchComponent implements OnInit {

  public dialogType = '';
  #route: ActivatedRoute;
  #matchProvider: MatchService;
  constructor(route: ActivatedRoute, matchProvider: MatchService) {
    this.#route = route;
    this.#matchProvider = matchProvider;
  }

  ngOnInit(): void {
    this.#route.params.pipe(map(x => x['matchId']), take(1), switchMap(x => this.#matchProvider.connectToMatch(x)) ).subscribe(x => {
      this.dialogType = x.type;
      console.log(this.dialogType);
    });
    
  }

}
