import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { SpinnerDialogComponent } from '../components/spinner-dialog/spinner-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  spinner: boolean = false;

  spinnerDialog: any;

  constructor(public dialog: MatDialog) { }

  public openSpinner() {
    this.spinner = true;
    setTimeout(() => {
      if (this.spinner) {
        this.spinnerDialog = this.dialog.open(SpinnerDialogComponent, { disableClose: true });
      }
    }, environment.config.spinner.waitTime);
  }

  public closeSpinner() {
    this.spinner = false;
    this.spinnerDialog?.close();
  }

}
