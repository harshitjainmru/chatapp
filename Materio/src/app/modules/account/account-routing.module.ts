import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FORGOT_PASSWORD, LOGIN, SIGNUP } from 'src/app/constant/routes';
import { AccountComponent } from './account.component';

const routes: Routes = [
  {
    path: '',
    component: AccountComponent,
    children: [
      {
        path: '',
        redirectTo: SIGNUP,
        pathMatch: 'full',
      },
      {
        path: LOGIN,
        loadChildren: () =>
          import('./pages/login/login.module').then((m) => m.LoginModule),
      },
      {
        path: SIGNUP,
        loadChildren: () =>
          import('./pages/signup/signup.module').then((m) => m.SignupModule),
      },
      {
        path: FORGOT_PASSWORD,
        loadChildren: () =>
          import('./pages/forgot-password/forgot-password.module').then(
            (m) => m.ForgotPasswordModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
