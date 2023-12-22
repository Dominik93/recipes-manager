import { Injectable } from '@angular/core';
import { LoggingService } from './logging';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConsoleLoggingService implements LoggingService {

  constructor() { }

  info(message: string, ...optionalParams: any[]) {
    console.info(message, ...optionalParams);
  }

  debug(message: string, ...optionalParams: any[]) {
    if(environment.logging.debug) {
      console.info(message, ...optionalParams);
    }
  }

  trace(message: string, ...optionalParams: any[]) {
    if(environment.logging.trace) {
      console.log(message, ...optionalParams);
    }
  }

  error(message: string, ...optionalParams: any[]) {
    console.error(message, ...optionalParams);
  }
}
