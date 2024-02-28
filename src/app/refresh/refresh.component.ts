import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription, interval } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { TimePipe } from '../pipes/time.pipe';

export type RefreshCounter = {
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

  @Input() enabed: boolean = false;

  @Input() counter: RefreshCounter = { countdown: 0 };

  @Output() onRefreshed = new EventEmitter<boolean>();

  private subscriptions: Subscription[] = [];

  ngOnInit(): void {
    const timer = interval(1000).subscribe(() => {
      if (this.counter.countdown > 0) {
        this.counter.countdown--;
      }
      if (this.counter.countdown === 0) {
        this.onRefreshed.emit(true);
      }
    });
    this.subscriptions.push(timer);
  }

  onRefresh() {
    this.onRefreshed.emit(true);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

}
