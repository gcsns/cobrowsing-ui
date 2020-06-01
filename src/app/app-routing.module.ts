import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CobrowsingformComponent } from './cobrowsingform/cobrowsingform.component';


const routes: Routes = [
  {path: "", component: CobrowsingformComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
