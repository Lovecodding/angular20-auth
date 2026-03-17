import { Routes } from '@angular/router';
import { AdminPage } from './admin/admin-page';
import { provideHttpClient, withInterceptors, withRequestsMadeViaParent } from '@angular/common/http';
import { authInterceptor } from './core/auth/auth-interceptor';
import { authGuard } from './core/auth/auth.guard';
import Login from './core/auth/login';

export const routes: Routes = [
  { path: 'login', component: Login },
  {
    path: '',
    component: AdminPage,
    canActivate: [authGuard],
    providers: [
      provideHttpClient(
        withInterceptors([
          authInterceptor
        ]),
        withRequestsMadeViaParent()
      )
    ]
  },
];
