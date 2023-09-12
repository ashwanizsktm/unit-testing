import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/interfaces/post.interface';
import { PostService } from 'src/app/services/post/post.service';

@Component({
	selector: 'app-posts',
	templateUrl: './posts.component.html',
	styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

	posts: Post[] = [];

	constructor(private postSrv: PostService) { }

	ngOnInit() {
		this.getPosts();
	}

	getPosts() {
		this.postSrv.getPosts().subscribe(posts => {
			console.log(posts);
			this.posts = posts;
		})
	}

	delete(post: Post) {
		this.posts = this.posts.filter(post => post.id != post.id);
		this.postSrv.deletePost(post).subscribe();
	}
}
