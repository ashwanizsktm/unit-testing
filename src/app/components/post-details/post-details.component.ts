import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/interfaces/post.interface';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {
  post!: Post
  constructor(private route: ActivatedRoute,
    private postSrv: PostService,
    private location: Location ) { }

  ngOnInit(): void {
    this.getPost()
  }

  getPost() {
    const id = this.route.snapshot.paramMap.get('id');
    id && this.postSrv.getPost(+id).subscribe(post => {
      this.post = post;
    })
  }

  goBack() {
    this.location.back();
  }

  save() {
    this.postSrv.updatePost(this.post).subscribe(()=> {
      this.goBack();
    })
  }
}
