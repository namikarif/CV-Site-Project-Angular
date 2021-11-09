import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BlogDetailComponent} from './components/blog-detail/blog-detail.component';
import {IndexComponent} from './components/index/index.component';

const router: Routes = [
  {
    path: '',
    component: IndexComponent
  },
  {
    path: 'blog/:id',
    component: BlogDetailComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(router)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
