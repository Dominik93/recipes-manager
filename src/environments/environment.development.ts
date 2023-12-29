import { MockAuthorizationService } from "../app/services/authorization/mock-authorization.service";
import { ConsoleLoggingService } from "../app/services/logging/console-logging.service";
import { InMemoryRecipesService } from "../app/services/recipes/in-memory-recipes.service";

export const environment = {
    contextPath: "/browser",
    logging: { debug: true, trace: false },
    config:{
        ownedProducts: {
            enabled: true
        },
        refresh: {
            enabled: true,
            countdown: 10
        }
    },
    loggingService: ConsoleLoggingService,
    authorizationService: MockAuthorizationService,
    recipesService: InMemoryRecipesService
};
