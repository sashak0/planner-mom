import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocaleDateAdapter } from '@app/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './features/home/home.module';
import { TranslocoRootModule } from './transloco-root.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TranslocoRootModule,
    HttpClientModule,
    HomeModule,
  ],
  providers: [
    {
      provide: DateAdapter,
      useClass: LocaleDateAdapter,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
