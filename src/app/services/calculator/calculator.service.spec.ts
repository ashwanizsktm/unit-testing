import { TestBed } from "@angular/core/testing";
import { LoggerService } from "../logger/logger.service";
import { CalculatorService } from "./calculator.service";

//Initial configuration...
/*
describe('CalculatorService', () => {
 // it wiil be executed before runing any test case.
 let mockLoggerService: any;
 let calculator: CalculatorService;

 beforeEach(() => {
	mockLoggerService = jasmine.createSpyObj('LoggerService', ['log']);
	calculator = new CalculatorService(mockLoggerService);
 })

	it('should add two numbers', () => {
		const result = calculator.add(2, 4);
		expect(result).toBe(6);
		// expect(mockLoggerService.log).toHaveBeenCalledTimes(1);
	});

	it('should subtract two numbers', () => {
		const result = calculator.substract(9, 4);
		expect(result).toBe(5);
		// expect(mockLoggerService.log).toHaveBeenCalledTimes(1);
	})
});
*/
// sSpyOn is a Jasmine feature that allows dynamically intercepting the calls to a function and change its result.

// configuration with testBed

describe('CalculatorService', () => {
	let loggerServiceSpy: jasmine.SpyObj<LoggerService>;
 	let calculator: CalculatorService;
	loggerServiceSpy = jasmine.createSpyObj('LoggerService', ['log']);

	beforeEach(() => {
		const mockLoggerService = jasmine.createSpyObj('LoggerService', ['log']);
		TestBed.configureTestingModule({
			providers:[CalculatorService, {
				provide: LoggerService,
				useValue: mockLoggerService
			}]
		 });
		 calculator = TestBed.inject(CalculatorService);
		 loggerServiceSpy = TestBed.inject(LoggerService) as jasmine.SpyObj<LoggerService>;
	  });

	 it('should add two numbers', () => {
		const result = calculator.add(2, 4);
		expect(result).toBe(6);
		expect(loggerServiceSpy.log).toHaveBeenCalledTimes(1);
	});

	it('should subtract two numbers', () => {
		const result = calculator.substract(9, 4);
		expect(result).toBe(5);
		expect(loggerServiceSpy.log).toHaveBeenCalledTimes(1);
	});
})
