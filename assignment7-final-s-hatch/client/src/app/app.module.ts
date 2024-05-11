import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ReviewsPageComponent } from './reviews-page/reviews-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import { RouterModule, Routes } from '@angular/router';
import { EditPageComponent } from './edit-page/edit-page.component';
import { FormsModule } from '@angular/forms';
import { NewPostComponent } from './new-post/new-post.component';

const routes:Routes = [
  {path: '', redirectTo: '/main-page', pathMatch: 'full'},
  {path: 'main-page', component: MainPageComponent},
  {path: 'editpage/:id', component:EditPageComponent},
  {path: 'new-post', component:NewPostComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    ReviewsPageComponent,
    MainPageComponent,
    EditPageComponent,
    NewPostComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
