import { Component, OnInit } from '@angular/core';
import { CoinSetting } from 'src/app/models/coinSetting';
import { CoinTrackApiService } from 'src/app/services/cointrack-api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  symbol: string = '';

  constructor(private cointrackApiService: CoinTrackApiService) {}

  ngOnInit(): void {
    this.cointrackApiService
      .getCoinSetting()
      .subscribe(
        (coinSetting: CoinSetting) => (this.symbol = coinSetting.symbol)
      );
  }
}
