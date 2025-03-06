import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MenuComponent } from './Features/menu/menu.component';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { MenuService } from './data-access/api/menu.service';

@NgModule({
  declarations: [AppComponent, MenuComponent],
  imports: [HttpClient, BrowserModule, BrowserAnimationsModule, FormsModule],
  providers: [MenuService],
  bootstrap: [AppComponent],
})
export class AppModule {}
