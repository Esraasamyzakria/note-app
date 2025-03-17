import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { headerInterceptor } from './core/interceptor/header/header.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from "ngx-spinner";

import { provideToastr } from 'ngx-toastr';
import { loadingInterceptor } from './core/interceptor/loading/loading.interceptor';
import { errorInterceptor } from './core/interceptor/error/error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes,withViewTransitions(),withInMemoryScrolling({scrollPositionRestoration:'top'})),
      provideClientHydration(withEventReplay()),
      provideHttpClient(withFetch(),withInterceptors([headerInterceptor,loadingInterceptor,errorInterceptor])),
      provideAnimations(), // required animations providers
      provideToastr(),
      importProvidersFrom(NgxSpinnerModule)
    ]
};
