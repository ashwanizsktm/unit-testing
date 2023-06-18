import { LoggerService } from "../logger/logger.service";
import { CalculatorService } from "./calculator.service";

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
		expect(mockLoggerService.log).toHaveBeenCalledTimes(1);
	});

	it('should subtract two numbers', () => {
		const result = calculator.substract(9, 4);
		expect(result).toBe(5);
		expect(mockLoggerService.log).toHaveBeenCalledTimes(1);
	})
});
