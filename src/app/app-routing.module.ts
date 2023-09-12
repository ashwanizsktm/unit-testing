import { AppComponent } from './app.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostDetailsComponent } from './components/post-details/post-details.component';
import { PostsComponent } from './components/posts/posts.component';


const routes: Routes = [
	{
		path: 'posts', component: PostsComponent
	},
	{
		path: 'details/:id', component: PostDetailsComponent
	},

	{
		path: '',
		component: AppComponent,
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
	declarations: []
})
export class AppRoutingModule { }