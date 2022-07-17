import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AllowedGames, MatchConfig } from 'src/app/interfaces/match-config.interface';
import { MatchListService } from '../services/match-list.service';

@Component({
  selector: 's-create-match',
  templateUrl: './create-match.component.html',
  styleUrls: ['./create-match.component.scss']
})
export class CreateMatchComponent implements OnInit {
  
  @Output() close = new EventEmitter<string>();
  
  constructor(private matchProvider: MatchListService) { }

  ngOnInit(): void {
  }

  public submit(form: NgForm) {
    if(form.valid) {
      const match: MatchConfig = {
        isRanked: form.value.isRanked,
        name: form.value.name,
        allowedGames: []
      };
      if (form.value.geier) {
        match.allowedGames.push(AllowedGames.GEIER);
      }
      if (form.value.wenz) {
        match.allowedGames.push(AllowedGames.WENZ);
      }
      if (form.value.solo) {
        match.allowedGames.push(AllowedGames.SOLO);
      }
      if (form.value.ruf) {
        match.allowedGames.push(AllowedGames.RUF);
      }
      this.matchProvider.createMatch(match)
      .then((x) => this.close.emit(x));
    }
  }

}
