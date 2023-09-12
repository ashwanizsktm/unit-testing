import { TestBed } from "@angular/core/testing";
import { LoggerService } from "./logger.service"

// initial config for understanding..
/*
describe('LoggerService', () => {
    it('it should not have any messages at starting', () => {
        // arrange
        const loggerSrv = new LoggerService();
        // act
        let count = loggerSrv.messages.length;
        //assert
        expect(count).toBe(0);
    });

    it('it should add message when log is called', () => {
        // arrange
        const loggerSrv = new LoggerService();
        // act
        loggerSrv.log('message')
        //assert
        expect(loggerSrv.messages.length).toBe(1);
    });

    it('it should clear all the messages when clear is called', () => {
        // arrange
        const loggerSrv = new LoggerService();
        loggerSrv.log('message');

        // act
        loggerSrv.clear();

        //assert
        expect(loggerSrv.messages.length).toBe(0);
    });
});
*/

// now using testBed

describe('LoggerService', ()=> {

    let serivce: LoggerService;

    beforeEach(()=> {
        TestBed.configureTestingModule({
            providers:[LoggerService]
        });
        serivce = TestBed.inject(LoggerService);
    });

    it('it should not have any messages at starting', () => {
        // arrange
        // act
        let count = serivce.messages.length;
        //assert
        expect(count).toBe(0);
    });

    it('it should add message when log is called', () => {
        // arrange
        // act
        serivce.log('message')
        //assert
        expect(serivce.messages.length).toBe(1);
    });

    it('it should clear all the messages when clear is called', () => {
        // arrange
        serivce.log('message');

        // act
        serivce.clear();

        //assert
        expect(serivce.messages.length).toBe(0);

    })
    
})
