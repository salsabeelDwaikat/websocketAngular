import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';

appConfig.providers?.push(importProvidersFrom(FormsModule));

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
