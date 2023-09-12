import { first } from 'rxjs';
import { Post } from './../../interfaces/post.interface';
import { PostComponent } from "./post.component";
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

/*
    * Once we test template and the logic then it'll be called integration testing..
    * By using testbed we don't need to use any import/export like browserModule and all
    * it'll take care of everything..
*/

describe('Post Component', () => {
    let fixture: ComponentFixture<PostComponent>;
    let component: PostComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [PostComponent],
            schemas: [NO_ERRORS_SCHEMA]
        });

        fixture = TestBed.createComponent(PostComponent) // it'll return the component fixture
        component = fixture.componentInstance;  // here we are getting all the instance of the components
        /*  Now we can access all the instance the methods and properties 
               *Note write only component. to see all the instance of the postcomponent.
        */
    })

    it('should create the post component using TestBed', () => {
        expect(component).toBeDefined(); // tobedefined is used to check whether the component is defined or not
    });

    it('should render the post title in the anchor element', () => {
        const post: Post = { id: 1, body: 'body 1', title: 'title 1' };
        component.post = post;
        // the desc. says that the meaning.
        fixture.detectChanges();
        const postElement: HTMLElement = fixture.nativeElement;
        const a = postElement.querySelector('a');
        expect(a?.textContent).toContain(post.title);
    })

    it('should render the post title in the anchor element using debug element', () => {
        const post: Post = { id: 1, body: 'body 1', title: 'title 1' };
        component.post = post;
        // the desc. says that the meaning.
        fixture.detectChanges();
        // const postElement: HTMLElement = fixture.nativeElement;
        // const a = postElement.querySelector('a');
        /**Debug Elements */
        const postDebugElement = fixture.debugElement;
        // Instead of quearySelector/quearySelectorAll it has query/queryAll.
        // query takes predicates.
        const aElement: HTMLElement = postDebugElement.query(By.css('a')).nativeElement;
        expect(aElement.textContent).toContain(post.title);
    })

    it('should raise an event when the delete post is clicked', () => {
        const post: Post = { id: 1, body: 'body 1', title: 'title 1' };
        component.post = post;
        component.delete.pipe(first()).subscribe(selectedPost => {
            expect(selectedPost).toEqual(post)
        });
        component.onDeletePost(new MouseEvent('click'));
    })
})