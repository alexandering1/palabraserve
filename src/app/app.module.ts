import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableroComponent } from './pages/tablero/tablero.component';
import { PalabraComponent } from './components/palabra/palabra.component';
import { LetraComponent } from './components/letra/letra.component';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { InicioComponent } from './pages/inicio/inicio.component';
import { RecordsComponent } from './pages/records/records.component';


@NgModule({
  declarations: [
    AppComponent,
    TableroComponent,
    PalabraComponent,
    LetraComponent,
    InicioComponent,
    RecordsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
