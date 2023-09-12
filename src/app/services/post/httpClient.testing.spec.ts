import { HttpClient } from "@angular/common/http";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing"
import { TestBed } from "@angular/core/testing"

let testUrl = '/data';
interface Data {
    name: string;
}

describe('HttpClient testing module', () => {
    let httpClient: HttpClient; 
    let httpTestingController: HttpTestingController;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
        });
        httpClient = TestBed.inject(HttpClient);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    it('should call the test url with get Request', (done: DoneFn) => {
        const testData: Data = { name: 'Ashwani kumar' };
        httpClient.get<Data>(testUrl).subscribe({
            next: (data) => {
                expect(data).toEqual(testData);
                done();
            },
            error: () => {
                done.fail;
            }
        });
        const request = httpTestingController.expectOne(testUrl);
        request.flush(testData);
        expect(request.request.method).toBe('GET');
    })

    // testing for multiple api calls

    it('should test multiple request', () => {
        const testData: Data[] = [{name: 'Ashwani'},{name: 'Rahul'}];
        httpClient.get<Data[]>(testUrl).subscribe();
        httpClient.get<Data[]>(testUrl).subscribe();
        httpClient.get<Data[]>(testUrl).subscribe();

        const request = httpTestingController.match(testUrl);
        expect(request.length).toEqual(3);

        // flust data means sending the response...
        request[0].flush([]);
        request[1].flush([1]);
        request[2].flush(testData);
    })

 })