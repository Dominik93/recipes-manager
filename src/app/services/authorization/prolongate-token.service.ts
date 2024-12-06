import { Inject, Injectable } from "@angular/core";
import { LoggingService } from "../logging/logging";
import { AuthorizationService } from "./authorization.service";
import { AuthStorageService } from "../auth-storage.service";
import { Authorization } from "../../authorization";

@Injectable({
    providedIn: 'root'
})
export class ProlongateTokenService {

    private rememberMe: boolean = false;

    private authorizationService?: AuthorizationService;

    constructor(
        @Inject('LoggingService') private log: LoggingService,
        private authStorageService: AuthStorageService) {

    }

    init(authorizationService: AuthorizationService): void {
        this.authorizationService = authorizationService;
        this.authorizationService.getAuthorizationData().subscribe((value) => {
            this.rememberMe = value.rememberMe || false;
        })
    }

    public prolongateToken(onRefreshed: () => void) {
        this.log.debug("ProlongateTokenService::prolongateToken remember me", this.rememberMe)
        if (!this.rememberMe) {
            onRefreshed();
            return;
        }

        if (this.authStorageService.isExpired()) {
            this.log.debug("ProlongateTokenService::prolongateToken isExpired")
            this.authStorageService.delete();
            this.authorizationService?.unauthorized();
        } else if (this.authStorageService.needRefresh()) {
            this.log.debug("ProlongateTokenService::prolongateToken needRefresh")
            const token: Authorization = this.authStorageService.get();
            this.authorizationService?.refresh(token.refreshToken).subscribe(result => {
                this.authStorageService.save({ applicationToken: token.applicationToken, authToken: result, refreshToken: token.refreshToken });
                onRefreshed();
            });
        } else {
            this.log.debug("ProlongateTokenService::prolongateToken execute")
            onRefreshed();
        }
    }

}