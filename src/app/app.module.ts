import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CreateComponent } from './create/create.component';
import { MenuComponent } from './menu/menu.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CreateComponent,
    MenuComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
