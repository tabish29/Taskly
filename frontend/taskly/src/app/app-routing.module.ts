import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './components/category/category.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { TaskComponent } from './components/task/task.component';

const routes: Routes = [
  {
    path: 'categories',
    component: CategoryComponent
  },
  {
    path: 'tasks',
    component: TaskComponent
  },
  {
    path: '**',
    component: NotFoundComponent,
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
