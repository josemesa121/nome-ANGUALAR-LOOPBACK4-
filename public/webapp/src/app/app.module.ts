import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {SimpleNotificationsModule} from 'angular2-notifications';
import 'remixicon/fonts/remixicon.css';
import {SDKBrowserModule} from './apiclient';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthLayoutComponent} from './layouts/auth-layout.component';
import {MainLayoutComponent} from './layouts/main-layout.component';
import {AuthModule} from './modules/auth/auth.module';
import {WorkoutsModule} from './modules/workout/workout.module';
import {SharedModule} from './shared/shared.module';






@NgModule({
  declarations: [
    AppComponent,
    AuthLayoutComponent,
    MainLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,

    SDKBrowserModule.forRoot(),

    AuthModule,
    WorkoutsModule,
    SimpleNotificationsModule.forRoot({
      timeOut: 3000,
      showProgressBar: true
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
