import { DefaultAuthorizationService } from "../app/services/authorization/default-authorization.service";
import { DisabledLoggingService } from "../app/services/logging/disabled-logging.service";
import { DefaultRecipesService } from "../app/services/recipes/default-recipes.service";

export const environment = {
    logging: { debug: false, trace: false },
    features: { ownedProduct: true },
    loggingService: DisabledLoggingService,
    authorizationService: DefaultAuthorizationService,
    recipesService: DefaultRecipesService
};
