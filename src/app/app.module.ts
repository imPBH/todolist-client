import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LandingComponent } from './components/landing/landing.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { LoginComponent } from './components/login/login.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { TodosComponent } from './components/todos/todos.component';
import { TodoComponent } from './components/todo/todo.component';
import { TodosPageComponent } from './pages/todos-page/todos-page.component';
import { AdminTodoComponent } from './components/admin-todo/admin-todo.component';
import { AdminTodosComponent } from './components/admin-todos/admin-todos.component';
import { AdminTodosPageComponent } from './pages/admin-todos-page/admin-todos-page.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LandingComponent,
    LandingPageComponent,
    LoginComponent,
    LoginPageComponent,
    RegisterComponent,
    RegisterPageComponent,
    ProfileComponent,
    ProfilePageComponent,
    TodosComponent,
    TodoComponent,
    TodosPageComponent,
    AdminTodoComponent,
    AdminTodosComponent,
    AdminTodosPageComponent,
    NotFoundComponent,
    NotFoundPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
