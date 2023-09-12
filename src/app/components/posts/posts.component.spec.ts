import { Post } from "src/app/interfaces/post.interface"
import { PostsComponent } from "./posts.component";
import { of } from "rxjs";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { PostService } from "src/app/services/post/post.service";
import { Component, Input, NO_ERRORS_SCHEMA } from "@angular/core";
import { By } from "@angular/platform-browser";
import { PostComponent } from "../post/post.component";

describe('PostsComponent', () => {
	let POSTS: Post[];
	let component: PostsComponent;
	let mockPostservice: any;
	let fixture: ComponentFixture<PostsComponent>;

	/**
	 * It was just for the shake of understanding..
			  @Component({
				selector: 'app-post',
				template: '<div></div>'
			})

		class FakePostComponent{
			@Input() post!:Post
		}
	 */


	// it is used to initialize the variable data.

	beforeEach(() => {
		POSTS = [
			{
				id: 1,
				body: 'body 1',
				title: 'title 1'
			},

			{
				id: 2,
				body: 'body 2',
				title: 'title 2'
			},

			{
				id: 3,
				body: 'body 3',
				title: 'title 3'
			}
		];

		mockPostservice = jasmine.createSpyObj(['getPosts', 'deletePost']);     // just to create the copy of these methods.

		//  TestBed comes with angulartesting which has got all the testing configuration.

		TestBed.configureTestingModule({
			declarations: [PostsComponent, PostComponent],
			providers: [
				{
					provide: PostService,
					useValue: mockPostservice
				}
			],
			schemas: [NO_ERRORS_SCHEMA]
		});

		// component = TestBed.inject(PostsComponent);
		// component = new PostsComponent(mockPostservice);
		// mockPostservice.deletePost.and.returnValue(of(true));
		// component.posts = POSTS;
		// component.delete(POSTS[1]); 

		// now using with fixture component
		fixture = TestBed.createComponent(PostsComponent);
		component = fixture.componentInstance;
	});

	it('should set the posts from the service directly', () => {
		mockPostservice.getPosts.and.returnValue(of(POSTS));
		fixture.detectChanges();
		expect(component.posts.length).toBe(3);
	})

	/* this one is with the fake/dummy component example
	it('should create one post child element for each post', ()=> {
		mockPostservice.getPosts.and.returnValue(of(POSTS));
		fixture.detectChanges();
		const debugElement = fixture.debugElement;
		const postElement = debugElement.queryAll(By.css('.posts'));
		expect(postElement.length).toBe(POSTS.length);
	});
	*/

	it('should create exact same number of Post component with number of posts', () => {
		/**the moment we write fixture.detechChanges() it'll call the ngOnInit() */
		mockPostservice.getPosts.and.returnValue(of(POSTS));
		fixture.detectChanges()
		const PostComponentDe = fixture.debugElement.queryAll(By.directive(PostComponent));
		expect(PostComponentDe.length).toBe(POSTS.length);
	})

	// testing the data is getting passed to child component ==> deep integration testing..
	it('should check whether the post data is getting received by the child(postComponent)', () => {
		mockPostservice.getPosts.and.returnValue(of(POSTS));
		fixture.detectChanges();
		const PostComponentDe = fixture.debugElement.queryAll(By.directive(PostComponent));

		// we have checked for the 1st element only.
		// const postComponentInstance = PostComponentDe[0].componentInstance as PostComponent;
		// expect(postComponentInstance.post.title).toEqual(POSTS[0].title);

		// now check for all the element

		for (let i = 0; i < PostComponentDe.length; i++) {
			const postComponentInstance = PostComponentDe[i].componentInstance as PostComponent;
			expect(postComponentInstance.post.title).toEqual(POSTS[i].title);
		}
	})

	/* need to check some error important is to understand the conecpt it'll work in real world
	 just try to understand the comcept 
	   you'll be able to understand that!

		describe('delete', () => {
			beforeEach(() => {
				mockPostservice.deletePost.and.returnValue(of(true));
				component.posts = POSTS;
			});
			it('should delete the selected Post from the posts', ()=> {
				component.delete(POSTS[1]);
				expect(component.posts.length).toBe(2);
			});
			it('should delete the actual selected Post in Posts', ()=> {
				for(let post of component.posts) {
					expect(post).not.toEqual(POSTS[1]);
				}
			});
			it('should call the delete method in Post Service once.', ()=> {
				component.delete(POSTS[1]);
				expect(mockPostservice.deletePost).toHaveBeenCalledTimes(1);
			});
		})
	*/
     /*
	describe('Delete', () => {
		it('should call the delete method when post component button is clicked', () => {
			// spyOn(component, 'delete');
			mockPostservice.getPosts.and.returnValue(of(POSTS));
			// it will call the ngOnInit()
			const postComponentDes = fixture.debugElement.queryAll(By.directive(PostComponent));
			fixture.detectChanges();
			for (let i = 0; i < postComponentDes.length; i++) {
				postComponentDes[i].query(By.css('button')).triggerEventHandler('click', { preventDefault: () => { } });
				expect(component.delete).toHaveBeenCalledWith(POSTS[i]);
			}
		});

		it('should call the delete method when the delete event is emitted in post component', () => {
			spyOn(component, 'delete');
			mockPostservice.getPosts.and.returnValue(of(POSTS));
			// it will call the ngOnInit()
			const postComponentDes = fixture.debugElement.queryAll(By.directive(PostComponent));
			fixture.detectChanges();

			(postComponentDes[0].componentInstance as PostComponent).delete.emit(undefined);
			expect(component.delete).toHaveBeenCalledWith(POSTS[0]);
			
			// for (let i = 0; i < postComponentDes.length; i++) {
			// 	postComponentDes[i].query(By.css('button')).triggerEventHandler('click', { preventDefault: () => { } });
			// 	expect(component.delete).toHaveBeenCalledWith(POSTS[i]);
			// }
		});
	});
	*/
})
