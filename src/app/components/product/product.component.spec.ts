import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductComponent } from './product.component';
import { By } from '@angular/platform-browser';

describe('ProductComponent', () => {
	let component: ProductComponent;
	let fixture: ComponentFixture<ProductComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ProductComponent]
		})
			.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ProductComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create the product component', () => {
		expect(component).toBeTruthy();
	});

	it('should have the title this component will have list of components', () => {
		expect(component.title).toEqual('this component will have list of components');
	});

	it('should render the title in h1 tag', ()=> {
		const productTitleEle = fixture.debugElement;
		const titleElement: HTMLElement = productTitleEle.query(By.css('h1')).nativeElement;
		expect(titleElement.innerHTML).toContain(component.title);
	})
});
