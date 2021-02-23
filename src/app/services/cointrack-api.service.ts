import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Coin } from '../models/coin';
import { CoinPrice } from '../models/coinPrice';
import { CoinSetting } from '../models/coinSetting';

@Injectable({
  providedIn: 'root',
})
export class CoinTrackApiService {
  constructor(private http: HttpClient) {}

  getCoins() {
    return this.http
      .get<Array<Coin>>(`${environment.apiUrl}/coins`)
      .pipe(shareReplay());
  }

  getCoinPrice(symbol: string) {
    return this.http
      .get<CoinPrice>(`${environment.apiUrl}/prices/${symbol}`)
      .pipe(shareReplay());
  }

  getCoinSetting() {
    return this.http
      .get<CoinSetting>(`${environment.apiUrl}/settings/coin`)
      .pipe(shareReplay());
  }

  updateCoinSetting(coinSettingDto: CoinSetting) {
    return this.http
      .put(`${environment.apiUrl}/settings/coin`, coinSettingDto)
      .pipe(shareReplay());
  }
}
