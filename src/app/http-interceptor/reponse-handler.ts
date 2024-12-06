import { HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { of } from 'rxjs';
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { message, close } from "../components/i18n/recipes-i18n";

@Injectable({
    providedIn: 'root'
})
export class ResponseHandler {

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
        this.snackBar.open(message, close, {
            duration: 2000,
        });
    }

}