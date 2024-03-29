import { Injectable } from '@angular/core';
import { LoggerService } from '../logger/logger.service';

@Injectable({
	providedIn: 'root'
})
export class CalculatorService {

	constructor(private loggerSrv: LoggerService) { }

	add(n1: number, n2: number) {
		let result = n1 + n2;
		this.loggerSrv.log('Add operation is called');
		return result;
	}

	substract(n1: number, n2: number) {
		let result = n1 - n2;
		this.loggerSrv.log('subtract operation is called');
		return result;
	}
}