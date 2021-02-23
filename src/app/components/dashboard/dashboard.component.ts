import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CoinSetting } from 'src/app/models/coinSetting';
import { CoinTrackApiService } from 'src/app/services/cointrack-api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  symbol: string = '';
  coinSetting$?: Observable<CoinSetting>;

  constructor(private cointrackApiService: CoinTrackApiService) {}

  ngOnInit(): void {
    this.coinSetting$ = this.cointrackApiService.getCoinSetting();
  }
}
