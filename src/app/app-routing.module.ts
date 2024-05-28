import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableroComponent } from './pages/tablero/tablero.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { RecordsComponent } from './pages/records/records.component';

const routes: Routes = [

  { path: '', component: InicioComponent},
  { path: 'tablero/:id', component: TableroComponent},
  { path: 'inicio', component: InicioComponent},
  { path: 'records', component: RecordsComponent },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


  
 }
