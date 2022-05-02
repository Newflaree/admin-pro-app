import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// Router
import { AppRoutingModule } from './app-routing.module';
// Modules
import { AuthModule } from './auth/auth.module';
import { PagesModule } from './pages/pages.module';
// Components
import { AppComponent } from './app.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';

@NgModule({
  declarations: [
    AppComponent,
    NopagefoundComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    PagesModule,
    AuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
