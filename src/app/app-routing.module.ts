import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { TodosPageComponent } from './pages/todos-page/todos-page.component';
import { AdminTodosPageComponent } from './pages/admin-todos-page/admin-todos-page.component';
import { AdminGuard } from './guards/admin.guard';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';

const routes: Routes = [
  {path: '', component: LandingPageComponent},
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'profile', component: ProfilePageComponent },
  { path: 'todos', component: TodosPageComponent },
  { path: 'admin/todos', component: AdminTodosPageComponent, canActivate: [AdminGuard] },
  { path: '**', component: NotFoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
