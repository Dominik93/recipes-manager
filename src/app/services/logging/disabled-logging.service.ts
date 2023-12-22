import { Injectable } from '@angular/core';
import { LoggingService } from './logging';

@Injectable({
  providedIn: 'root'
})
export class DisabledLoggingService implements LoggingService {

  constructor() { }

  info(message: string, ...optionalParams: any[]) { }
  debug(message: string, ...optionalParams: any[]) { }
  error(message: string, ...optionalParams: any[]) { }

}
