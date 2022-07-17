import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, Observable, tap } from 'rxjs';
import { MatchConfig } from 'src/app/interfaces/match-config.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MatchListService {
  public matches = new BehaviorSubject<Array<any>>([]);
  constructor(private http: HttpClient) {
    this.connectToMatchList().pipe(tap(x => this.matches.next(x))).subscribe();
  }

  public createMatch(match: MatchConfig): Promise<any> {
    return firstValueFrom(this.http.put('http://' + environment.serverAddress + '/match', match));
  }

  public joinMatch(matchId: string) {
    const body = { matchId };
    return firstValueFrom(this.http.put('http://' + environment.serverAddress + '/join', body));
  }

  private connectToMatchList(): Observable<any[]> {
    const webSocket = new WebSocket('ws://' + environment.serverAddress + '/matches');
    return new Observable<any[]>(observer => {
      webSocket.onmessage = (telegram) => observer.next(JSON.parse(telegram.data));
      webSocket.onclose = () => observer.complete();
    })
  }
}
