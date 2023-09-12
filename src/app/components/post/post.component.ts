import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Post } from 'src/app/interfaces/post.interface';


@Component({
	selector: 'app-post',
	templateUrl: './post.component.html',
	styleUrls: ['./post.component.scss']
})

export class PostComponent implements OnInit {
	@Input() post!: Post;
	@Output() delete = new EventEmitter<Post>();

	constructor() { }

	ngOnInit() {
	}

	onDeletePost(event: Event) {
		event.stopPropagation();
		this.delete.emit(this.post);
	}
}