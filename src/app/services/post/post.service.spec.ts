import { of } from 'rxjs';
import { PostService } from './post.service';
import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

describe('post Service', ()=> {
    let postService: PostService;
    let httpClientSpy: jasmine.SpyObj<HttpClient>;
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
    

    // normal configurations..
    /*
        beforeEach(()=> {
            httpClientSpy = jasmine.createSpyObj('HttpClient', ['get'])
            postService = new PostService(httpClientSpy);
        });
        describe('getPost()', ()=> {
            it('should return expected posts when getPost is called', (done: DoneFn) => {
                httpClientSpy.get.and.returnValue(of(POSTS));
                postService.getPosts().subscribe({
                    next: (posts) => {
                        expect(posts).toEqual(POSTS);
                        done();
                    },
                    error: () => {
                        done.fail;
                    }
                });
                expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
            })
        })
    */    

    // configurations with TestBed
    beforeEach(()=> {
        let httpClientSpyObj = jasmine.createSpyObj('HttpClient', ['get']);
        TestBed.configureTestingModule({
            providers:[PostService, {
                provide: HttpClient, useValue: httpClientSpyObj
            }]
        })
        postService = TestBed.inject(PostService);
        httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
    });

    describe('getPost()', ()=> {
        it('should return expected posts when getPost is called', (done: DoneFn) => {
            httpClientSpy.get.and.returnValue(of(POSTS));
            postService.getPosts().subscribe({
                next: (posts) => {
                    expect(posts).toEqual(POSTS);
                    done();
                },
                error: () => {
                    done.fail;
                }
            });
            expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
        })
    })

})