import { HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { of } from 'rxjs';
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
    providedIn: 'root'
})
export class ResponseHandler {

    private message = $localize`:error-message@@error-message:Something went wrong`;

    constructor(private snackBar: MatSnackBar) { }

    handle(evt: any) {
        if (evt instanceof HttpResponse) {
            if (evt.body && evt.body.success !== undefined) {
                if (!evt.body.success) {
                    this.openSnackBar();
                }
            }
        }
    }

    handlerError(err: any) {
        if (err instanceof HttpErrorResponse) {
            this.openSnackBar();
        }
        return of(err);
    }

    private openSnackBar() {
        this.snackBar.open(this.message, "Close", {
            duration: 2000,
        });
    }

}