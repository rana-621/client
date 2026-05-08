import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPagination } from '../shared/Models/Pagination';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  baseURL = 'https://localhost:7048/api/'
constructor(private http: HttpClient) {}

getProducts() {
  return this.http.get<IPagination[]>(this.baseURL+"Products/get-all");

}
}
