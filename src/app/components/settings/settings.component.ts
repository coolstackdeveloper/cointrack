import { Component, OnInit } from '@angular/core';
import { EMPTY, Subject } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Coin } from 'src/app/models/coin';
import { CoinSetting } from 'src/app/models/coinSetting';
import { CoinTrackApiService } from 'src/app/services/cointrack-api.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  coins: Array<Coin> = [];
  coinSetting?: CoinSetting;
  coinSettingSubject: Subject<CoinSetting> = new Subject<CoinSetting>();

  constructor(private cointrackApiService: CoinTrackApiService) {}

  ngOnInit(): void {
    this.coinSettingSubject.subscribe(
      (coinSetting: CoinSetting) => (this.coinSetting = coinSetting)
    );

    this.cointrackApiService
      .getCoins()
      .subscribe((coins: Array<Coin>) => (this.coins = coins));

    this.cointrackApiService
      .getCoinSetting()
      .subscribe((coinSetting: CoinSetting) =>
        this.coinSettingSubject.next(coinSetting)
      );
  }

  changeCoinSetting(event: any) {
    this.cointrackApiService
      .updateCoinSetting({ symbol: event.target.value })
      .pipe(
        switchMap(() => EMPTY),
        catchError(() => this.cointrackApiService.getCoinSetting())
      )
      .subscribe((coinSetting: CoinSetting) =>
        {
          console.log(this.coinSetting?.symbol);
          this.coinSettingSubject.next(coinSetting);
        }
      );
  }
}
