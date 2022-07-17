import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Telegram } from 'src/app/interfaces/telegram.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  #webSocket!: WebSocket;
  constructor() { }

  public connectToMatch(id: string): Observable<Telegram> {
    this.#webSocket = new WebSocket('ws://' + environment.serverAddress + '/game?id=' + id);
    return new Observable<Telegram>(observer => {
      this.#webSocket.onopen = () => observer.next({type: 'areYouReady', content: false})
      this.#webSocket.onmessage = (telegram) => observer.next(JSON.parse(telegram.data));
      this.#webSocket.onclose = () => observer.complete();
    });
  }

  public sendTelegram(telegram: Telegram) {
    if(this.#webSocket.readyState === this.#webSocket.OPEN) {
      this.#webSocket.send(JSON.stringify(telegram));
    } else {
      this.#webSocket.onopen = () => {
        this.#webSocket.send(JSON.stringify(telegram));
      }
    }
  }
}
