import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import {
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { routes } from './app/app.routes';
import { authInterceptor } from './app/core/interceptor/token-http.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),

    provideHttpClient(
      withInterceptors([authInterceptor]) // 👈 تفعيل الـ Interceptor
    ),
  ],
}).catch((err) => console.error(err));
