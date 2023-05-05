import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ABS_ACCOUNT_LOGIN, ABS_ACCOUNT_SIGNUP } from './constant/absolute-routes';
import { ACCOUNT, LAYOUT } from './constant/routes';
import { AuthGuard } from './guards/auth.guard';
import { LayoutGuard } from './guards/layout.guard';

const routes: Routes = [
  {path:'',redirectTo:ACCOUNT,pathMatch:'full'},
  {
    path: ACCOUNT,
    loadChildren: () =>
      import('./modules/account/account.module').then((m) => m.AccountModule),

    },
    {
      path:LAYOUT,
      canActivate:[AuthGuard],
      loadChildren:()=>import('./modules/layout/layotu.module').then((m)=>m.LayotuModule)
    },
    {path:'**',redirectTo:ABS_ACCOUNT_SIGNUP,pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
