import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription, interval } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { TimePipe } from '../pipes/time.pipe';
import { environment } from '../../environments/environment';
import { RefreshService } from '../services/refresh.service';

type RefreshCounter = {
  countdown: number
}

@Component({
  selector: 'rm-refresh',
  standalone: true,
  imports: [CommonModule, MatIconModule, TimePipe],
  templateUrl: './refresh.component.html',
  styleUrl: './refresh.component.css'
})
export class RefreshComponent implements OnInit, OnDestroy {
  readonly SECOND: number = 1000;

  enabed: boolean = environment.config.refresh.enabled;

  counter: RefreshCounter = { countdown: environment.config.refresh.countdown };

  private timerSubscription: Subscription = Subscription.EMPTY;

  constructor(private refreshService: RefreshService) { }

  ngOnInit(): void {
    this.timerSubscription = interval(this.SECOND).subscribe(() => {
      if (this.counter.countdown > 0) {
        this.counter.countdown--;
      }
      if (this.counter.countdown === 0) {
        this.refresh();
      }
    });
  }

  onRefresh(): void {
    this.refresh();
  }

  private refresh(): void {;
    this.counter = { countdown: environment.config.refresh.countdown };
    this.refreshService.refresh();
  }

  ngOnDestroy(): void {
    this.timerSubscription.unsubscribe();
  }

}
