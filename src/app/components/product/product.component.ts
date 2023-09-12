import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  title: string = 'this component will have list of components';

  constructor() { }

  ngOnInit(): void {
  }



}
