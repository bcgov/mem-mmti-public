import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectComponent } from 'app/project/project.component';
import { NewsComponent } from 'app/news/news.component';

const routes: Routes = [
  {
    path: '',
    children: []
  },
  {
    path: 'project',
    component: ProjectComponent
  },
  {
    path: 'news',
    component: NewsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
