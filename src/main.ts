
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { KeycloakService } from './app/shared/services/keycloak.service';
import { authInterceptor } from './app/core/interceptor/token-http.interceptor';

const keycloak = new KeycloakService({} as any); // temporary injection bypass

async function main() {
  await keycloak.init();

  bootstrapApplication(AppComponent, {
    providers: [
      provideHttpClient(withInterceptors([authInterceptor])),
      provideRouter(routes),
      { provide: KeycloakService, useValue: keycloak }
    ],
  });
}

main();
