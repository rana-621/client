import { Component, OnInit } from '@angular/core';
import { ShopService } from './shop.service';
import { IProduct } from '../shared/Models/Product';
import { IPagination } from '../shared/Models/Pagination';

@Component({
  selector: 'app-shop',
  standalone: false,
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements OnInit {

  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.getAllProducts()
  }
product : IProduct[]
getAllProducts() { 
    this.shopService.getProducts().subscribe({
    next: ((value : IPagination)=>{
      this.product  = value.data
    })
    
  })
}
}
