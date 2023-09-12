import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostDetailsComponent } from './post-details.component';
import { PostService } from 'src/app/services/post/post.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Post } from 'src/app/interfaces/post.interface';
import { By } from '@angular/platform-browser';

describe('PostDetailsComponent', () => {
	let component: PostDetailsComponent;
	let fixture: ComponentFixture<PostDetailsComponent>; 
	let mockPostService: jasmine.SpyObj<PostService>;

	beforeEach(() => {
		let mockActivatedRoute = {
			snapShot: {
				ParamMap: {
					get: () => {
						return '3'
					},
				},
			},
		}
		mockPostService = jasmine.createSpyObj(['getPost', 'updatePost'])
		let mockLocation = jasmine.createSpyObj(['back'])
		TestBed.configureTestingModule({
			declarations: [PostDetailsComponent],
			providers: [
				{ provide: Location, useValue: mockLocation},
				{ provide: PostService, useValue: mockPostService},
				{ provide: ActivatedRoute, useValue: mockActivatedRoute},
			]
		});
		fixture = TestBed.createComponent(PostDetailsComponent);
	});

	it('should render the post title in the h2 tag', ()=> {
		mockPostService.getPost.and.returnValue(of({
			id: 3,
			body: 'body 3',
			title: 'title 3'
		} as Post))
		//ngOnInit()
		fixture.detectChanges();

		const element = fixture.debugElement.query(By.css('h2')).nativeElement as HTMLElement;
		expect(element.textContent).toBe(component.post.title); 
	})
});
