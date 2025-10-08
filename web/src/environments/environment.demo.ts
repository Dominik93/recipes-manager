import { MockAuthorizationService } from "../app/services/authorization/mock-authorization.service";
import { DisabledLoggingService } from "../app/services/logging/disabled-logging.service";
import { InMemoryRecipesService } from "../app/services/recipes/in-memory-recipes.service";
import { EmptyUrlProvider } from "../app/services/url/empty-url-provider.service";

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
        spinner: {
            waitTime: 1000,
        },
        expiringStorageConfig: {
            expired: 30,
            refresh: 20
        }
    },
    loggingService: DisabledLoggingService,
    authorizationService: MockAuthorizationService,
    recipesService: InMemoryRecipesService,
    urlProvider: EmptyUrlProvider
};
