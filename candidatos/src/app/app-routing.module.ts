import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidatosComponent } from './components/candidatos/candidatos.component';
import { InformacionComponent } from './components/informacion/informacion.component';

const routes: Routes = [
  {path: '', component: CandidatosComponent},
  {path: 'info', component: InformacionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


