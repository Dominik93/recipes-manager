import { DefaultAuthorizationService } from "../app/services/authorization/default-authorization.service";
import { DisabledLoggingService } from "../app/services/logging/disabled-logging.service";
import { DefaultRecipesService } from "../app/services/recipes/default-recipes.service";

export const environment = {
    contextPath: "/recipes-manager/browser",
    logging: { debug: false, trace: false },
    config: {
        ownedProducts: {
            enabled: true
        },
        refresh: {
            enabled: true,
            countdown: 15
        },
        expiringStorageConfig: {
            expired: 20,
            refresh: 30
        }
    },
    loggingService: DisabledLoggingService,
    authorizationService: DefaultAuthorizationService,
    recipesService: DefaultRecipesService
};
