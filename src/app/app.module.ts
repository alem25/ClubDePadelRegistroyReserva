import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CourtsComponent } from './courts/courts.component';
import { ServicesComponent } from './services/services.component';
import { LocationComponent } from './location/location.component';
import { AboutComponent } from './about/about.component';
import { FooterComponent } from './footer/footer.component';
import { CookiesComponent } from './cookies/cookies.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { BookComponent } from './book/book.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { StartComponent } from './start/start.component';

@NgModule({
  declarations: [
    AppComponent,
    CourtsComponent,
    ServicesComponent,
    LocationComponent,
    AboutComponent,
    FooterComponent,
    CookiesComponent,
    NavigationBarComponent,
    BookComponent,
    LoginComponent,
    RegisterComponent,
    StartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
