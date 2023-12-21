/*
*  Protractor support is deprecated in Angular.
*  Protractor is used in this example for compatibility with Angular documentation tools.
*/
import { bootstrapApplication, provideProtractorTestingSupport} from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';

bootstrapApplication(AppComponent,
    {providers: [
                importProvidersFrom(HttpClientModule),
                provideProtractorTestingSupport(),
                provideAnimations()
                ]})
  .catch(err => console.error(err));
