/// <reference types="@angular/localize" />

/*
*  Protractor support is deprecated in Angular.
*  Protractor is used in this example for compatibility with Angular documentation tools.
*/
import { bootstrapApplication, provideProtractorTestingSupport } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { environment } from './environments/environment';
import { HttpRequestInterceptor } from './app/http-interceptor/http-request-interceptor';

bootstrapApplication(AppComponent,
    {
        providers: [
            importProvidersFrom(HttpClientModule),
            provideProtractorTestingSupport(),
            provideAnimations(),
            { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
            {
                provide: 'LoggingService',
                useClass: environment.loggingService
            },
            {
                provide: 'RecipesService',
                useClass: environment.recipesService
            }
        ]
    })
    .catch(err => console.error(err));
