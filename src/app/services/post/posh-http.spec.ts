import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { PostService } from "./post.service"
import { TestBed } from "@angular/core/testing";

describe('postservice (httpclientTeestingModule)', ()=> {
    let postService: PostService;
    let httpTestingController: HttpTestingController;
    let POSTS = [
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

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [PostService],
            imports: [HttpClientTestingModule]
        });
        postService = TestBed.inject(PostService);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    describe('getPosts()', () => {
        it('should return post when getPost() is called', (done: DoneFn) => {
            postService.getPosts().subscribe({
                next: (data) => {
                    expect(data).toEqual(POSTS);
                    done();
                },
                error: () => {
                    done.fail;
                }
            });
            //if we try to call the api twice it'll throw an error saying that it was expected to call once but found 2 request.
            /*
                postService.getPosts().subscribe({
                    next: (data) => {
                        expect(data).toEqual(POSTS);
                        done();
                    },
                    error: () => {
                        done.fail;
                    }
                });
            */

            // this will not throw any error bcz it is only concerned about the getPosts method
            /*
                postService.deletePost(POSTS[0]).subscribe();
            */

            const request = httpTestingController.expectOne('https://jsonplaceholder.typicode.com/posts');
            request.flush(POSTS);
            expect(request.request.method).toBe('GET');
        });
    });

    describe('getPost()', () => {
        it('should return the single post when getPost is called with postId', ()=> {
            // postService.getPost(2).subscribe();
        
            postService.getPost(1).subscribe();
            // it'll not throw any error as it is only bothered about the first call so this is wrong so
            // how can we overcome this we want no other call should be made other than
            // httpTestingController.expectOne('https://jsonplaceholder.typicode.com/posts/1');

     
            const request = httpTestingController.expectOne('https://jsonplaceholder.typicode.com/posts/1');
            expect(request.request.method).toBe('GET');
            httpTestingController.verify();
            // the verify method checks the getPost with id is called only once.. if we call it more than once
            // from anywhere of this testing file we'll get an error..
        })
    })
})