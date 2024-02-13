import { MockAuthorizationService } from "../app/services/authorization/mock-authorization.service";
import { DisabledLoggingService } from "../app/services/logging/disabled-logging.service";
import { InMemoryRecipesService } from "../app/services/recipes/in-memory-recipes.service";

export const environment = {
    contextPath: "/recipes-manager/demo/browser",
    logging: { debug: false, trace: false },
    config:{
        ownedProducts: {
            enabled: true
        },
        refresh: {
            enabled: true,
            countdown: 15,
            notify: false
        },
        expiringStorageConfig: {
            expired: 30,
            refresh: 20
        }
    },
    loggingService: DisabledLoggingService,
    authorizationService: MockAuthorizationService,
    recipesService: InMemoryRecipesService
};
