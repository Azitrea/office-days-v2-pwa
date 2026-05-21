import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideServiceWorker } from '@angular/service-worker';
import { ThemeService } from './service/theme/theme.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAppInitializer(() => {
      try {
        var t = localStorage.getItem('app-theme');
        if (t) document.documentElement.setAttribute('mode', t);
      } catch (e) {}

      inject(ThemeService).init();
    }),
    provideRouter(routes),
    provideServiceWorker('ngsw-worker.js', {
      enabled: true,
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
};
