import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { interval, Subscription } from 'rxjs';
import {
  bufferCount,
  distinctUntilChanged,
  map,
  switchMap,
} from 'rxjs/operators';
import { CoinPrice } from 'src/app/models/coinPrice';
import { CoinTrackApiService } from 'src/app/services/cointrack-api.service';

@Component({
  selector: 'app-coin',
  templateUrl: './coin.component.html',
  styleUrls: ['./coin.component.scss'],
})
export class CoinComponent implements OnInit, OnChanges, OnDestroy {
  @Input() symbol: string = '';
  price?: CoinPrice;
  changePercent?: number;
  priceSubscription?: Subscription;

  constructor(private cointrackApiService: CoinTrackApiService) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.priceSubscription?.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!!changes.symbol.currentValue) {
      const prices$ = interval(1000).pipe(
        switchMap(() =>
          this.cointrackApiService.getCoinPrice(changes.symbol.currentValue)
        ),
        map((coinPrice: CoinPrice) => coinPrice)
      );

      this.priceSubscription = prices$
        .pipe(
          distinctUntilChanged(
            (x: CoinPrice, y: CoinPrice) => x.value === y.value
          ),
          bufferCount(2)
        )
        .subscribe((prices: Array<CoinPrice>) => {
          this.price = prices[1];
          this.changePercent =
            ((prices[1].value - prices[0].value) / prices[0].value) * 100;
        });
    }
  }
}
