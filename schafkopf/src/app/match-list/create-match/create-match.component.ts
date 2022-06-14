import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { AllowedGames, Match } from 'src/app/interfaces/match.interface';
import { MatchListService } from '../services/match-list.service';

@Component({
  selector: 's-create-match',
  templateUrl: './create-match.component.html',
  styleUrls: ['./create-match.component.scss']
})
export class CreateMatchComponent implements OnInit {
  
  @Output() close = new EventEmitter<void>();

  @HostListener('click') emitClose() {
    this.submit();
  }
  
  constructor(private matchProvider: MatchListService) { }

  ngOnInit(): void {
  }

  public submit() {
    const match: Match = {
      isRanked: false,
      name: 'Erstes Match',
      allowedGames: [AllowedGames.GEIER, AllowedGames.RUF, AllowedGames.SOLO, AllowedGames.WENZ]
    };
    this.matchProvider.createMatch(match).then((x) => {
      console.log(x);
      this.close.emit();
    });
  }

}
