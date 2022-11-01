import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule) },
  { path: 'workspace', loadChildren: () => import('./work-space/work-space.module').then((m) => m.WorkSpaceModule) },
  { path: 'profile', loadChildren: () => import('./profile/profile.module').then((m) => m.ProfileModule) },
  { path: '', loadChildren: () => import('./welcome/welcome.module').then((m) => m.WelcomeModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
