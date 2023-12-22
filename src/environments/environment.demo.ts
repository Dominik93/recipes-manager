import { MockAuthorizationService } from "../app/services/authorization/mock-authorization.service";
import { DisabledLoggingService } from "../app/services/logging/disabled-logging.service";
import { InMemoryRecipesService } from "../app/services/recipes/in-memory-recipes.service";

export const environment = {
    logging: {debug: false, trace: false},
    loggingService: DisabledLoggingService,
    authorizationService: MockAuthorizationService,
    recipesService: InMemoryRecipesService
};
