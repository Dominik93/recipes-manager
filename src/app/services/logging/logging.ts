export interface LoggingService {

  info: (message: string, ...optionalParams: any[]) => void;

  debug: (message: string, ...optionalParams: any[]) => void;
  
  error: (message: string, ...optionalParams: any[]) => void;

}
