import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

constructor(private http: HttpClient){}
baseURL='https://localhost:7048/api/Categories/get-all'
Category:any

getCategory(){
  return this.http.get(this.baseURL).subscribe({
    next:((value:any)=>{
      this.Category=value
      console.log(value)
    })
  })
}

ngOnInit(): void {
  this.getCategory()
}
  title = 'client';
  
} 
