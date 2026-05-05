import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IProduct } from './shared/Models/Product';
import { IPagination } from './shared/Models/Pagination';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

constructor(private http: HttpClient){}
baseURL = 'https://localhost:7048/api/Products/get-all'
Products : IProduct[];

getProducts(){
  return this.http.get(this.baseURL).subscribe({
    next:((value:IPagination) => {
      this.Products=value.data
      console.log(value.data)
    })
  })
}

ngOnInit(): void {
  this.getProducts()
}
  title = 'client';
  
} 
