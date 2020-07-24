import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CobrowsingformComponent } from './cobrowsingform/cobrowsingform.component';
import { Cobrowsing2Component } from './cobrowsing2/cobrowsing2.component';


const routes: Routes = [
  { path: '', component: CobrowsingformComponent },
  { path: 'cobrowsing2', component: Cobrowsing2Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
