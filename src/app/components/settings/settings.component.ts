import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Coin } from 'src/app/models/coin';
import { CoinSetting } from 'src/app/models/coinSetting';
import { CoinTrackApiService } from 'src/app/services/cointrack-api.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit, OnDestroy {
  coins: Array<Coin> = [];
  coinSetting?: CoinSetting;
  coinSettingSubject: Subject<CoinSetting> = new Subject<CoinSetting>();

  constructor(
    private cointrackApiService: CoinTrackApiService,
    private router: Router
  ) {}

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

  ngOnDestroy(): void {
    // TODO - unsubscribe from subscriptions
  }

  changeCoinSetting(event: any) {
    this.cointrackApiService
      .updateCoinSetting({ symbol: event.target.value })
      .pipe(
        switchMap(() => this.cointrackApiService.getCoinSetting()),
        catchError(() => this.cointrackApiService.getCoinSetting())
      )
      .subscribe(() => {
        this.router.navigateByUrl('/');
      });
  }
}
