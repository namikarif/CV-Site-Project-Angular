import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './components/main/app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app-routing.module';
import {AppearDirective, HeaderDirective, SkillsWidthDirective, TimeLineDirective} from './directives/appear.directive';
import { BlogDetailComponent } from './components/blog-detail/blog-detail.component';
import { IndexComponent } from './components/index/index.component';

@NgModule({
  declarations: [
    AppComponent,
    AppearDirective,
    SkillsWidthDirective,
    TimeLineDirective,
    HeaderDirective,
    BlogDetailComponent,
    IndexComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    BrowserModule.withServerTransition({appId: 'serverApp'}),
    RouterModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [
    FormsModule,
    AppearDirective
  ]
})
export class AppModule {
}
