import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { INITIAL_DATA, STORAGE } from './workout-data/workout-data.service';
import { initialWorkoutData } from './constants';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    { provide: STORAGE, useValue: localStorage },
    { provide: INITIAL_DATA, useValue: initialWorkoutData },
  ],
};
