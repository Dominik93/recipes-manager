import {
  Directive,
  EventEmitter,
  HostListener,
  Inject,
  Input,
  Output
} from "@angular/core";
import { LoggingService } from "../services/logging/logging";

@Directive({
  selector: '[rmLongPress]',
  standalone: true,
})
export class LongPressDirective {
  private touchTimeout: any;
  @Input() time: number = 400;
  @Output() longpress = new EventEmitter();

  constructor(@Inject('LoggingService') private log: LoggingService) { }

  @HostListener('mousedown', ['$event'])
  @HostListener('touchstart', ['$event'])
  onClickOrTouch(event: any): void {
    this.log.debug("LongPressDirective::onClickOrTouch");
    this.touchTimeout = setTimeout(() => {
      this.log.debug("LongPressDirective::emit event");
      this.longpress.emit(event);
    }, this.time);
  }

  @HostListener('mouseup')
  @HostListener('touchend')
  onCancel(): void {
    this.log.debug("LongPressDirective::onCancel");
    clearTimeout(this.touchTimeout);
  }

}