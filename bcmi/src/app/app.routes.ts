import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactComponent } from './static-pages/contact/contact.component';
import { HomeComponent } from './home/home.component';
import { MainMapComponent } from './map/main-map/main-map.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LifecycleComponent } from './static-pages/lifecycle/lifecycle.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: 'lifecycle2',
    component: LifecycleComponent,
  },
  {
    path: 'map',
    component: MainMapComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
